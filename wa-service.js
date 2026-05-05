// WhatsApp listener service.
// - Boots a whatsapp-web.js client with persistent LocalAuth (QR scan once).
// - Listens for messages from groups the user has chosen to watch.
// - Extracts emails (regex + light context) and queues each as an Inbox item.
// - Persists state (auth handled by LocalAuth; inbox/watched/dedupe in JSON).

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
require("dotenv").config();

const STATE_PATH = path.join(__dirname, "wa-state.json");
const SESSION_PATH = path.join(__dirname, ".wwebjs_auth");

// Per-user state map. Shape: { [userId]: { watchedGroups, inbox, seenMessageIds, seenEmailKeys } }
let state = { users: {}, ownerUserId: null };
let saveTimer = null;

function emptyUserState() {
  return { watchedGroups: [], inbox: [], seenMessageIds: [], seenEmailKeys: [] };
}

function userState(uid) {
  if (!uid) uid = "_anonymous";
  if (!state.users[uid]) state.users[uid] = emptyUserState();
  return state.users[uid];
}

function loadState() {
  try {
    if (fs.existsSync(STATE_PATH)) {
      const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
      // Migrate legacy (flat) state into `_anonymous` bucket if needed
      if (raw && !raw.users && (raw.inbox || raw.watchedGroups)) {
        state = { users: { _anonymous: { ...emptyUserState(), ...raw } }, ownerUserId: null };
      } else {
        state = { users: {}, ownerUserId: null, ...raw };
      }
    }
  } catch (err) {
    console.error("[wa] load state failed:", err.message);
  }
}

function saveStateSoon() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
    } catch (err) {
      console.error("[wa] save state failed:", err.message);
    }
  }, 250);
}

function trimDedupe(u) {
  if (u.seenMessageIds.length > 5000) u.seenMessageIds = u.seenMessageIds.slice(-3000);
  if (u.seenEmailKeys.length > 2000) u.seenEmailKeys = u.seenEmailKeys.slice(-1500);
}

let client = null;
let qrDataUrl = null;
let status = "idle"; // idle | initializing | qr | authenticated | ready | disconnected | auth_failure

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Pull obvious context from a message body. This is a heuristic; the user
// reviews each entry before sending so false positives are not a disaster.
function extractContext(text) {
  const out = { jobTitle: "", company: "" };

  // "Hiring for <Role>" / "Looking for <Role>" / "Role: <Role>"
  const roleMatch = text.match(/(?:hiring|looking|opening|opportunity|role|position)[\s:\-]+(?:a\s+|an\s+|for\s+)?([A-Z][\w\s/+\-.&]{2,60})(?:\s+at|\s+@|\n|,|\.)/i);
  if (roleMatch) out.jobTitle = roleMatch[1].trim();

  // "at <Company>" / "@ <Company>"
  const companyMatch = text.match(/(?:at|@)\s+([A-Z][\w\s.&\-]{1,40})(?:\s|,|\.|\n|$)/);
  if (companyMatch) out.company = companyMatch[1].trim();

  return out;
}

function snippet(text, maxLen = 280) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > maxLen ? clean.slice(0, maxLen) + "..." : clean;
}

// Extract text from an image using Claude Vision API
async function extractTextFromImage(base64Data, mimeType) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error("[wa] no ANTHROPIC_API_KEY for image OCR"); return ""; }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mimeType || "image/jpeg", data: base64Data } },
            { type: "text", text: "Extract ALL text from this image exactly as written. Include email addresses, company names, job titles, requirements, and contact details. Return only the extracted text, nothing else." }
          ]
        }]
      }),
    });
    const data = await res.json();
    if (!res.ok) { console.error("[wa] vision API error:", data.error?.message); return ""; }
    return data.content?.map(c => c.text || "").join("") || "";
  } catch (err) {
    console.error("[wa] vision extraction failed:", err.message);
    return "";
  }
}

// Route incoming live messages to the WA session owner's inbox (if group is watched).
async function handleMessage(msg) {
  try {
    // Skip non-group messages early without calling getChat() (which is fragile)
    if (!msg.from || !msg.from.endsWith("@g.us")) return;
    const ownerId = state.ownerUserId;
    if (!ownerId) return;
    const u = userState(ownerId);
    if (!u.watchedGroups.includes(msg.from)) return;
    if (u.seenMessageIds.includes(msg.id._serialized)) return;

    let chat;
    try { chat = await msg.getChat(); } catch { /* getChat sometimes fails on stale state */ }
    if (!chat || !chat.isGroup) return;

    u.seenMessageIds.push(msg.id._serialized);

    const body = msg.body || "";
    const emails = body.match(EMAIL_RE);
    if (!emails || !emails.length) {
      saveStateSoon();
      return;
    }

    const ctx = extractContext(body);
    const sender = msg.author || msg._data?.notifyName || "";
    const ts = (msg.timestamp || Math.floor(Date.now() / 1000)) * 1000;

    let added = 0;
    for (const rawEmail of emails) {
      const email = rawEmail.toLowerCase();
      const dedupeKey = `${email}|${chat.id._serialized}`;
      if (u.seenEmailKeys.includes(dedupeKey)) continue;
      u.seenEmailKeys.push(dedupeKey);

      u.inbox.unshift({
        id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
        email,
        company: ctx.company,
        jobTitle: ctx.jobTitle,
        snippet: snippet(body),
        groupId: chat.id._serialized,
        groupName: chat.name || "",
        sender,
        ts,
        status: "pending",
      });
      added++;
    }

    if (added > 0) {
      console.log(`[wa] queued ${added} email(s) from "${chat.name}" for user ${ownerId}`);
      if (u.inbox.length > 500) u.inbox = u.inbox.slice(0, 500);
    }

    trimDedupe(u);
    saveStateSoon();
  } catch (err) {
    console.error("[wa] message handler error:", err.message);
  }
}

function init(userId) {
  loadState();
  if (userId) {
    state.ownerUserId = userId;
    userState(userId); // ensure bucket exists
    saveStateSoon();
  }
  if (client && status === "ready") return;
  if (client) {
    try { client.destroy(); } catch { }
    client = null;
  }
  status = "initializing";

  // Resolve a Chromium executable in this order:
  //   1. PUPPETEER_EXECUTABLE_PATH env var (explicit override, e.g. in Docker)
  //   2. macOS Google Chrome (local dev)
  //   3. Linux Chromium (typical Debian/Alpine containers)
  //   4. Puppeteer's bundled Chromium (falls back if nothing else)
  const chromeCandidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  const executablePath = chromeCandidates.find(p => p && fs.existsSync(p));

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: SESSION_PATH }),
    puppeteer: {
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    },
  });

  client.on("qr", async (qr) => {
    try {
      qrDataUrl = await QRCode.toDataURL(qr, { width: 320, margin: 1 });
      status = "qr";
      console.log("[wa] QR ready — scan from the WhatsApp Connect tab");
    } catch (err) {
      console.error("[wa] QR encode failed:", err.message);
    }
  });

  client.on("authenticated", () => { status = "authenticated"; qrDataUrl = null; console.log("[wa] authenticated"); });
  client.on("auth_failure", (m) => { status = "auth_failure"; console.error("[wa] auth failure:", m); });
  client.on("ready", onReady);
  client.on("disconnected", (r) => { status = "disconnected"; console.warn("[wa] disconnected:", r); });
  client.on("message", handleMessage);

  client.initialize().catch(err => {
    status = "idle";
    console.error("[wa] init failed:", err.message);
  });
}

let cachedGroups = [];     // metadata for API responses
let cachedChatObjects = []; // actual Chat objects for fetchMessages
let groupsFetchedAt = 0;

let fetchingGroups = false;

async function fetchGroupsInBackground() {
  if (fetchingGroups || !client || status !== "ready") return;
  fetchingGroups = true;
  try {
    const chats = await Promise.race([
      client.getChats(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("getChats timed out")), 60000)),
    ]);
    const groups = chats.filter(c => c.isGroup);
    cachedChatObjects = groups;
    cachedGroups = groups.map(c => ({
      id: c.id._serialized,
      name: c.name || "(unnamed)",
      participants: c.participants?.length || 0,
    }));
    groupsFetchedAt = Date.now();
    console.log(`[wa] cached ${cachedGroups.length} groups`);
  } catch (err) {
    console.error("[wa] group fetch failed:", err.message);
  }
  fetchingGroups = false;
}

async function listGroups(userId) {
  if (!client || status !== "ready") return [];
  if (cachedGroups.length === 0 || Date.now() - groupsFetchedAt > 300000) {
    fetchGroupsInBackground();
  }
  const u = userState(userId);
  return cachedGroups.map(g => ({ ...g, watched: u.watchedGroups.includes(g.id) }));
}

function onReady() {
  status = "ready";
  console.log("[wa] ready — listening for watched groups");
  fetchGroupsInBackground();
}

function setWatched(userId, groupIds) {
  const u = userState(userId);
  u.watchedGroups = Array.isArray(groupIds) ? groupIds : [];
  saveStateSoon();
  return u.watchedGroups;
}

function getInbox(userId) {
  return userState(userId).inbox;
}

function addDiscoveredItems(userId, items) {
  const u = userState(userId);
  let added = 0;
  for (const item of items) {
    const dedupeKey = `${item.email}|${item.groupId || "discover"}`;
    if (u.seenEmailKeys.includes(dedupeKey)) continue;
    u.seenEmailKeys.push(dedupeKey);

    u.inbox.unshift({
      id: `${item.ts || Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      email: item.email,
      company: item.company || "",
      jobTitle: item.jobTitle || "",
      snippet: item.snippet || "",
      groupId: item.groupId || "discover",
      groupName: item.groupName || item.source || "Discover",
      sender: "",
      ts: item.ts || Date.now(),
      status: "pending",
    });
    added++;
  }
  if (u.inbox.length > 500) u.inbox = u.inbox.slice(0, 500);
  trimDedupe(u);
  saveStateSoon();
  return added;
}

function markInboxItem(userId, id, newStatus) {
  const u = userState(userId);
  const item = u.inbox.find(x => x.id === id);
  if (!item) return null;
  item.status = newStatus;
  saveStateSoon();
  return item;
}

function clearDismissed(userId) {
  const u = userState(userId);
  const before = u.inbox.length;
  u.inbox = u.inbox.filter(x => x.status !== "dismissed");
  saveStateSoon();
  return before - u.inbox.length;
}

async function logout(userId) {
  if (!client) return;
  try { await client.logout(); } catch { }
  try { await client.destroy(); } catch { }
  client = null;
  qrDataUrl = null;
  status = "idle";
  try { fs.rmSync(SESSION_PATH, { recursive: true, force: true }); } catch { }
  if (userId) {
    const u = userState(userId);
    u.seenMessageIds = [];
    u.seenEmailKeys = [];
  }
  state.ownerUserId = null;
  saveStateSoon();
}

async function processGroup(userId, groupId, roleFilter) {
  if (!client || status !== "ready") throw new Error("WhatsApp not connected");
  if (!userId) throw new Error("userId required");
  const u = userState(userId);

  const groupMeta = cachedGroups.find(g => g.id === groupId);
  if (!groupMeta) throw new Error("Group not found — try refreshing groups");

  // Bypass chat.fetchMessages() which crashes on current WhatsApp Web.
  // Query WhatsApp's internal store via Puppeteer and aggressively load history.
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
  const rawMessages = await client.pupPage.evaluate(async (gid, since) => {
    const chatWid = window.Store.WidFactory.createWid(gid);
    const chat = await window.Store.Chat.find(chatWid);

    // Load up to 8 batches of earlier messages to cover ~30 days
    for (let i = 0; i < 8; i++) {
      const before = chat.msgs.length;
      try { await chat.loadEarlierMsgs(); } catch { break; }
      const after = chat.msgs.length;
      if (after === before) break;
      const oldest = chat.msgs.getModelsArray()[0];
      if (oldest && oldest.t < since) break;
    }

    const msgs = chat.msgs.getModelsArray();
    return msgs
      .filter(m => m.t >= since)
      .map(m => ({
        id: m.id._serialized || `${m.id.fromMe}_${m.id.id}`,
        body: m.body || "",
        timestamp: m.t,
        author: m.author || "",
        notifyName: m.notifyName || "",
        type: m.type || "chat",
        hasMedia: !!(m.mediaData && m.type === "image"),
      }));
  }, groupId, thirtyDaysAgo);

  // Process image messages: download media → extract text via Claude Vision
  let imageCount = 0;
  for (const msg of rawMessages) {
    if (!msg.hasMedia) continue;
    if (u.seenMessageIds.includes(msg.id)) continue;
    try {
      // Download image via whatsapp-web.js Message object
      const waMsg = await client.getMessageById(msg.id);
      if (!waMsg) continue;
      const media = await waMsg.downloadMedia();
      if (!media || !media.data) continue;

      const extractedText = await extractTextFromImage(media.data, media.mimetype);
      if (extractedText) {
        msg.body = (msg.body ? msg.body + "\n" : "") + extractedText;
        msg.fromImage = true;
        imageCount++;
        console.log(`[wa] extracted text from image in "${groupMeta.name}"`);
      }
    } catch (err) {
      // getMessageById may fail on some messages — skip silently
      console.error(`[wa] image download failed: ${err.message}`);
    }
  }
  if (imageCount > 0) console.log(`[wa] processed ${imageCount} image(s) with OCR`);

  const keywords = roleFilter
    ? roleFilter.toLowerCase().split(/[\s,]+/).filter(Boolean)
    : [];

  let added = 0;
  for (const msg of rawMessages) {
    if (!msg.body) continue;
    if (u.seenMessageIds.includes(msg.id)) continue;

    const body = msg.body;

    if (keywords.length > 0) {
      const lower = body.toLowerCase();
      const matches = keywords.some(k => lower.includes(k));
      if (!matches) continue;
    }

    const emails = body.match(EMAIL_RE);
    if (!emails || !emails.length) continue;

    u.seenMessageIds.push(msg.id);
    const ctx = extractContext(body);
    const ts = (msg.timestamp || Math.floor(Date.now() / 1000)) * 1000;
    const sender = msg.author || msg.notifyName || "";

    for (const rawEmail of emails) {
      const email = rawEmail.toLowerCase();
      const dedupeKey = `${email}|${groupId}`;
      if (u.seenEmailKeys.includes(dedupeKey)) continue;
      u.seenEmailKeys.push(dedupeKey);

      u.inbox.unshift({
        id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
        email,
        company: ctx.company,
        jobTitle: ctx.jobTitle || roleFilter || "",
        snippet: snippet(body),
        groupId,
        groupName: groupMeta.name || "",
        sender,
        ts,
        status: "pending",
      });
      added++;
    }
  }

  if (u.inbox.length > 500) u.inbox = u.inbox.slice(0, 500);
  trimDedupe(u);
  saveStateSoon();
  console.log(`[wa] user ${userId}: processed ${rawMessages.length} msgs from "${groupMeta.name}", found ${added} new email(s)`);
  return { processed: rawMessages.length, found: added };
}

function getStatus(userId) {
  const u = userState(userId);
  const owner = state.ownerUserId;
  const isOwner = owner && owner === userId;
  return {
    status,
    qrDataUrl: isOwner || !owner ? qrDataUrl : null,
    watchedGroups: u.watchedGroups,
    inboxCount: u.inbox.filter(x => x.status === "pending").length,
    ownerUserId: owner,
    isOwner,
    sessionBusy: !!owner && !isOwner && status !== "idle",
  };
}

module.exports = { init, getStatus, listGroups, setWatched, getInbox, markInboxItem, clearDismissed, logout, processGroup, addDiscoveredItems };
