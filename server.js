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

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Health check
app.get("/", (req, res) => res.json({ status: "ok", service: "HR Outreach Agent API" }));

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

// Proxy for Anthropic API to avoid CORS
app.post("/generate", async (req, res) => {
  const { prompt, modelType } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Handle OpenAI (ChatGPT)
  if (modelType === "openai") {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY not configured on server" });
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
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

      // Format response to match the existing frontend expectation (data.content[0].text)
      // or return a standard format. The frontend expects data.content.map(...)
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
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
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

// ── WhatsApp endpoints ──────────────────────────────────────────────
const wa = require("./wa-service");

app.get("/wa/status", (req, res) => res.json(wa.getStatus()));

app.post("/wa/start", (req, res) => {
  wa.init();
  res.json(wa.getStatus());
});

app.post("/wa/logout", async (req, res) => {
  await wa.logout();
  res.json({ ok: true });
});

app.get("/wa/groups", async (req, res) => {
  try {
    const groups = await wa.listGroups();
    res.json({ groups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/wa/watch", (req, res) => {
  const { groupIds } = req.body;
  const watched = wa.setWatched(groupIds);
  res.json({ watchedGroups: watched });
});

app.post("/wa/process", async (req, res) => {
  const { groupId, role } = req.body;
  if (!groupId) return res.status(400).json({ error: "groupId required" });
  try {
    const result = await wa.processGroup(groupId, role || "");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/wa/inbox", (req, res) => res.json({ inbox: wa.getInbox() }));

app.post("/wa/inbox/:id/apply", (req, res) => {
  const item = wa.markInboxItem(req.params.id, "applied");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

app.post("/wa/inbox/:id/dismiss", (req, res) => {
  const item = wa.markInboxItem(req.params.id, "dismissed");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

app.post("/wa/inbox/clear-dismissed", (req, res) => {
  const removed = wa.clearDismissed();
  res.json({ removed });
});

app.listen(PORT, () => console.log(`✅ HR Agent server running on http://localhost:${PORT}`));
