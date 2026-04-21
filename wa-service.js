// WhatsApp listener service.
// - Boots a whatsapp-web.js client with persistent LocalAuth (QR scan once).
// - Listens for messages from groups the user has chosen to watch.
// - Extracts emails (regex + light context) and queues each as an Inbox item.
// - Persists state (auth handled by LocalAuth; inbox/watched/dedupe in JSON).

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { Client, LocalAuth } = require("whatsapp-web.js");

const STATE_PATH = path.join(__dirname, "wa-state.json");
const SESSION_PATH = path.join(__dirname, ".wwebjs_auth");

// In-memory mirror of state, persisted to disk.
let state = {
  watchedGroups: [],     // ["123@g.us", ...]
  inbox: [],             // [{ id, email, company, jobTitle, snippet, groupId, groupName, sender, ts, status }]
  seenMessageIds: [],    // for dedupe of WA messages
  seenEmailKeys: [],     // `${email}|${groupId}` to avoid re-queueing same email from same group
};
let saveTimer = null;

function loadState() {
  try {
    if (fs.existsSync(STATE_PATH)) {
      const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
      state = { ...state, ...raw };
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

// Cap arrays so the JSON file doesn't grow forever.
function trimDedupe() {
  if (state.seenMessageIds.length > 5000) state.seenMessageIds = state.seenMessageIds.slice(-3000);
  if (state.seenEmailKeys.length > 2000) state.seenEmailKeys = state.seenEmailKeys.slice(-1500);
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

async function handleMessage(msg) {
  try {
    const chat = await msg.getChat();
    if (!chat.isGroup) return;
    if (!state.watchedGroups.includes(chat.id._serialized)) return;
    if (state.seenMessageIds.includes(msg.id._serialized)) return;

    state.seenMessageIds.push(msg.id._serialized);

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
      if (state.seenEmailKeys.includes(dedupeKey)) continue;
      state.seenEmailKeys.push(dedupeKey);

      state.inbox.unshift({
        id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
        email,
        company: ctx.company,
        jobTitle: ctx.jobTitle,
        snippet: snippet(body),
        groupId: chat.id._serialized,
        groupName: chat.name || "",
        sender,
        ts,
        status: "pending", // pending | applied | dismissed
      });
      added++;
    }

    if (added > 0) {
      console.log(`[wa] queued ${added} email(s) from "${chat.name}"`);
      // Cap inbox at 500 pending+done entries to keep payloads sane.
      if (state.inbox.length > 500) state.inbox = state.inbox.slice(0, 500);
    }

    trimDedupe();
    saveStateSoon();
  } catch (err) {
    console.error("[wa] message handler error:", err.message);
  }
}

function init() {
  if (client && status === "ready") return;
  // Clean up stale client if exists
  if (client) {
    try { client.destroy(); } catch { }
    client = null;
  }
  loadState();
  status = "initializing";

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: SESSION_PATH }),
    puppeteer: {
      headless: true,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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

async function listGroups() {
  if (!client || status !== "ready") return [];
  // Always return cache immediately; trigger background refresh if stale
  if (cachedGroups.length === 0 || Date.now() - groupsFetchedAt > 300000) {
    fetchGroupsInBackground();
  }
  return cachedGroups.map(g => ({ ...g, watched: state.watchedGroups.includes(g.id) }));
}

// Pre-fetch groups when WA becomes ready
function onReady() {
  status = "ready";
  console.log("[wa] ready — listening to watched groups");
  fetchGroupsInBackground();
}

function setWatched(groupIds) {
  state.watchedGroups = Array.isArray(groupIds) ? groupIds : [];
  saveStateSoon();
  return state.watchedGroups;
}

function getInbox() {
  return state.inbox;
}

function markInboxItem(id, newStatus) {
  const item = state.inbox.find(x => x.id === id);
  if (!item) return null;
  item.status = newStatus;
  saveStateSoon();
  return item;
}

function clearDismissed() {
  const before = state.inbox.length;
  state.inbox = state.inbox.filter(x => x.status !== "dismissed");
  saveStateSoon();
  return before - state.inbox.length;
}

async function logout() {
  if (!client) return;
  try { await client.logout(); } catch { }
  try { await client.destroy(); } catch { }
  client = null;
  qrDataUrl = null;
  status = "idle";
  // wipe session + dedupe so next init starts clean
  try { fs.rmSync(SESSION_PATH, { recursive: true, force: true }); } catch { }
  state.seenMessageIds = [];
  state.seenEmailKeys = [];
  saveStateSoon();
}

async function processGroup(groupId, roleFilter) {
  if (!client || status !== "ready") throw new Error("WhatsApp not connected");

  const groupMeta = cachedGroups.find(g => g.id === groupId);
  if (!groupMeta) throw new Error("Group not found — try refreshing groups");

  // Bypass chat.fetchMessages() which crashes on current WhatsApp Web.
  // Instead, query WhatsApp's internal message store directly via Puppeteer.
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
  const rawMessages = await client.pupPage.evaluate(async (gid, since) => {
    const chatWid = window.Store.WidFactory.createWid(gid);
    const chat = await window.Store.Chat.find(chatWid);
    // Load more messages from server
    try { await chat.loadEarlierMsgs(); } catch {}
    try { await chat.loadEarlierMsgs(); } catch {}
    try { await chat.loadEarlierMsgs(); } catch {}

    const msgs = chat.msgs.getModelsArray();
    return msgs
      .filter(m => m.body && m.t >= since)
      .map(m => ({
        id: m.id._serialized || `${m.id.fromMe}_${m.id.id}`,
        body: m.body,
        timestamp: m.t,
        author: m.author || "",
        notifyName: m.notifyName || "",
      }));
  }, groupId, thirtyDaysAgo);

  const keywords = roleFilter
    ? roleFilter.toLowerCase().split(/[\s,]+/).filter(Boolean)
    : [];

  let added = 0;
  for (const msg of rawMessages) {
    if (!msg.body) continue;
    if (state.seenMessageIds.includes(msg.id)) continue;

    const body = msg.body;

    // If role filter provided, skip messages that don't mention any keyword
    if (keywords.length > 0) {
      const lower = body.toLowerCase();
      const matches = keywords.some(k => lower.includes(k));
      if (!matches) continue;
    }

    const emails = body.match(EMAIL_RE);
    if (!emails || !emails.length) continue;

    state.seenMessageIds.push(msg.id);
    const ctx = extractContext(body);
    const ts = (msg.timestamp || Math.floor(Date.now() / 1000)) * 1000;
    const sender = msg.author || msg.notifyName || "";

    for (const rawEmail of emails) {
      const email = rawEmail.toLowerCase();
      const dedupeKey = `${email}|${groupId}`;
      if (state.seenEmailKeys.includes(dedupeKey)) continue;
      state.seenEmailKeys.push(dedupeKey);

      state.inbox.unshift({
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

  if (state.inbox.length > 500) state.inbox = state.inbox.slice(0, 500);
  trimDedupe();
  saveStateSoon();
  console.log(`[wa] processed ${rawMessages.length} msgs from "${groupMeta.name}", found ${added} new email(s)`);
  return { processed: rawMessages.length, found: added };
}

function getStatus() {
  return { status, qrDataUrl, watchedGroups: state.watchedGroups, inboxCount: state.inbox.filter(x => x.status === "pending").length };
}

module.exports = { init, getStatus, listGroups, setWatched, getInbox, markInboxItem, clearDismissed, logout, processGroup };
