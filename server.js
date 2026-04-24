const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Configure local storage for attachments
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Health check — used by AuthGate and Render health probe
app.get("/healthz", (req, res) => res.json({ status: "ok", service: "HR Outreach Agent API" }));

// Resolve attachment descriptors from the client into nodemailer attachments.
// Each item may be { filename, name } where `filename` is the server-side stored name
// returned from /upload, and `name` is the original display name.
function resolveAttachments(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map(a => {
      if (!a || !a.filename) return null;
      const safe = path.basename(a.filename);
      const full = path.join(__dirname, "uploads", safe);
      if (!fs.existsSync(full)) return null;
      return { filename: a.name || safe, path: full };
    })
    .filter(Boolean);
}

// Send single email
app.post("/send", async (req, res) => {
  const { to, subject, body, replyTo, fromName, attachments } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields: to, subject, body" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${fromName || process.env.GMAIL_USER}" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: replyTo || process.env.GMAIL_USER,
      subject,
      text: body,
      attachments: resolveAttachments(attachments),
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("Send error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Send batch emails
app.post("/send-batch", async (req, res) => {
  const { emails, fromName, replyTo, attachments } = req.body;
  const sharedAttachments = resolveAttachments(attachments);
  // emails = [{ to, subject, body }, ...]

  if (!Array.isArray(emails) || !emails.length) {
    return res.status(400).json({ error: "emails array required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const results = [];
  for (const email of emails) {
    try {
      const perEmailAttachments = resolveAttachments(email.attachments);
      const info = await transporter.sendMail({
        from: `"${fromName || process.env.GMAIL_USER}" <${process.env.GMAIL_USER}>`,
        to: email.to,
        replyTo: replyTo || process.env.GMAIL_USER,
        subject: email.subject,
        text: email.body,
        attachments: perEmailAttachments.length ? perEmailAttachments : sharedAttachments,
      });
      results.push({ to: email.to, success: true, messageId: info.messageId });
    } catch (err) {
      results.push({ to: email.to, success: false, error: err.message });
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  res.json({ results });
});

// Proxy for LLM APIs. Uses caller-supplied API key; we never persist it.
app.post("/generate", async (req, res) => {
  const { prompt, modelType, apiKey } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Handle OpenAI (ChatGPT)
  if (modelType === "openai") {
    const key = apiKey || process.env.OPENAI_API_KEY;
    if (!key) {
      return res.status(400).json({ error: "No OpenAI API key provided. Add one in Settings → API Keys." });
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "OpenAI API error");
      }

      const result = {
        content: [{ text: data.choices[0].message.content }]
      };
      res.json(result);
    } catch (err) {
      console.error("OpenAI Generation error:", err.message);
      res.status(500).json({ error: err.message });
    }
    return;
  }

  // Handle Anthropic (Claude) - default or explicit
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(400).json({ error: "No Claude API key provided. Add one in Settings → API Keys." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.error?.message || JSON.stringify(data.error) || "Anthropic API error";
      console.error("Anthropic error response:", JSON.stringify(data, null, 2));
      throw new Error(errMsg);
    }

    res.json(data);
  } catch (err) {
    console.error("Anthropic Generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Local Storage Endpoints
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ name: req.file.originalname, filename: req.file.filename, url });
});

app.delete("/upload/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ status: "deleted" });
  });
});

// Silent admin notification on new-user onboarding completion.
// Client fires this fire-and-forget; we swallow failures and respond immediately.
app.post("/admin/new-user", async (req, res) => {
  res.json({ ok: true }); // respond first so client never waits
  const admin = process.env.ADMIN_NOTIFY_EMAIL || "raiankitsr@gmail.com";
  if (!admin || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;

  const p = req.body?.profile || {};
  const u = req.body?.user || {};
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const lines = [
    `New hr-agent signup · ${when} IST`,
    `─────────────────────────────────`,
    `Name       : ${p.name || "-"}`,
    `Google ID  : ${u.uid || "-"}`,
    `Email      : ${u.email || p.replyTo || "-"}`,
    `Reply-To   : ${p.replyTo || "-"}`,
    `Role Type  : ${p.roleType || "-"}`,
    `Current    : ${p.currentRole || "-"}`,
    `Experience : ${p.experience || "-"}`,
    `Location   : ${p.location || "-"}`,
    `Skills     : ${(p.skills || []).join(", ") || "-"}`,
    `LinkedIn   : ${p.linkedin || "-"}`,
    `Portfolio  : ${p.portfolio || "-"}`,
    `Photo      : ${u.photoURL || "-"}`,
    ``,
    `Pitch:`,
    p.about || "-",
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: `"hr-agent" <${process.env.GMAIL_USER}>`,
      to: admin,
      subject: `🎉 New hr-agent user: ${p.name || u.email || "unknown"}`,
      text: lines,
    });
  } catch (err) {
    console.error("[admin-notify] failed:", err.message);
  }
});

// ── WhatsApp endpoints ──────────────────────────────────────────────
const wa = require("./wa-service");

// Extract user id from header or query. Every WA/inbox endpoint needs it.
function getUserId(req) {
  return req.header("x-user-id") || req.query.userId || (req.body && req.body.userId) || null;
}

app.get("/wa/status", (req, res) => res.json(wa.getStatus(getUserId(req))));

app.post("/wa/start", (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });
  wa.init(userId);
  res.json(wa.getStatus(userId));
});

app.post("/wa/logout", async (req, res) => {
  const userId = getUserId(req);
  await wa.logout(userId);
  res.json({ ok: true });
});

app.get("/wa/groups", async (req, res) => {
  try {
    const groups = await wa.listGroups(getUserId(req));
    res.json({ groups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/wa/watch", (req, res) => {
  const userId = getUserId(req);
  const { groupIds } = req.body;
  const watched = wa.setWatched(userId, groupIds);
  res.json({ watchedGroups: watched });
});

app.post("/wa/process", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });
  const { groupId, role } = req.body;
  if (!groupId) return res.status(400).json({ error: "groupId required" });
  try {
    const result = await wa.processGroup(userId, groupId, role || "");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/wa/inbox", (req, res) => res.json({ inbox: wa.getInbox(getUserId(req)) }));

app.post("/wa/inbox/:id/apply", (req, res) => {
  const item = wa.markInboxItem(getUserId(req), req.params.id, "applied");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

app.post("/wa/inbox/:id/dismiss", (req, res) => {
  const item = wa.markInboxItem(getUserId(req), req.params.id, "dismissed");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

app.post("/wa/inbox/clear-dismissed", (req, res) => {
  const removed = wa.clearDismissed(getUserId(req));
  res.json({ removed });
});

app.post("/wa/inbox/add", (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });
  const { items } = req.body || {};
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "items array required" });
  const added = wa.addDiscoveredItems(userId, items.map(i => ({
    email: (i.email || "").toLowerCase().trim(),
    company: i.company || "",
    jobTitle: i.jobTitle || "",
    snippet: i.note || i.snippet || "",
    groupId: "manual",
    groupName: "Manual Entry",
    ts: Date.now(),
  })).filter(i => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)));
  res.json({ added });
});

// ── Discover endpoint (scrapes job boards + careers pages) ────────
const discoverService = require("./discover-service");

app.post("/discover", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });
  const { city, role } = req.body || {};
  if (!role) return res.status(400).json({ error: "role required" });
  try {
    const result = await discoverService.discover({ city: city || "ahmedabad", role });
    const added = wa.addDiscoveredItems(userId, result.items);
    res.json({ ...result, added });
  } catch (err) {
    console.error("Discover error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Serve the built Vite frontend from dist/ in production. SPA catch-all sends
// every non-API route to index.html so client-side routing works.
const DIST_DIR = path.join(__dirname, "dist");
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get(/^\/(?!send|send-batch|generate|upload|uploads|wa|discover|admin|healthz).*/, (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
}

app.listen(PORT, () => console.log(`✅ HR Agent server running on http://localhost:${PORT}`));
