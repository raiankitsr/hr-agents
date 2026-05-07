// Cover letter service — generates personalized cover letter text via Claude,
// then renders it to a clean PDF using Puppeteer.

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];
const CHROME_PATH = CHROME_CANDIDATES.find(p => p && fs.existsSync(p));

function buildCoverLetterPrompt({ profile, recipient, jobTitle, company, jobPosting }) {
  const roleTypeLabels = { frontend: "Frontend", backend: "Backend", fullstack: "Full Stack", mobile: "Mobile", devops: "DevOps", data: "Data / ML", design: "Design", pm: "Product", other: "" };
  const senderLines = [
    `Name: ${profile.name || "the applicant"}`,
    profile.currentRole && `Current: ${profile.currentRole}`,
    profile.experience && `Experience: ${profile.experience}`,
    profile.roleType && `Target role type: ${roleTypeLabels[profile.roleType] || profile.roleType}`,
    profile.location && `Location: ${profile.location}`,
    profile.skills?.length && `Key skills: ${profile.skills.join(", ")}`,
    profile.about && `Pitch / background: ${profile.about}`,
    profile.linkedin && `LinkedIn: ${profile.linkedin}`,
    profile.portfolio && `Portfolio: ${profile.portfolio}`,
  ].filter(Boolean).join("\n");

  return `You are writing a formal one-page cover letter for a job application. The candidate will attach this PDF alongside their resume. The hiring manager skims many applications — the cover letter must clearly demonstrate fit and stand out.

SENDER PROFILE:
${senderLines}

ROLE: ${jobTitle || "Open opportunity"}
COMPANY: ${company || ""}
RECIPIENT: ${recipient || "Hiring Manager"}

JOB POSTING (read carefully):
"""
${jobPosting || "(no posting provided)"}
"""

PHASE 1 (silent): Read the posting. Identify 3-4 must-have requirements. Cross-reference with sender profile. Pick the strongest 3 matches. Note specific keywords from the posting to mirror.

PHASE 2: Write the cover letter following this exact structure.

STRUCTURE (5 paragraphs):
P1 (Hook — 2-3 sentences): Open by stating the role you're applying for and the company. Add ONE specific reason this company/role fits — drawn from the posting, not generic flattery.
P2 (Background — 3-4 sentences): Brief summary of your relevant experience. Include years, primary stack, and ONE concrete project or quantified impact (use real numbers if in profile, otherwise specific scope).
P3 (Why I match — 4-5 sentences): The strongest paragraph. Address the role's top 3 requirements directly. Use the posting's exact terminology. Show evidence: "I shipped X with Y impact" beats "I'm experienced in X".
P4 (Why this company — 2-3 sentences): One specific thing about the company that motivates you (their product, mission, or scale — only what's in the posting or factually known). What you'd uniquely bring.
P5 (Close — 2 sentences): Express interest in interview. Sign off cordially.

HARD RULES:
1. Length: 280-350 words total. Cleanly fits one page.
2. Greeting: "Dear [Recipient]," — use first name from email if available, otherwise "Dear Hiring Manager,".
3. Tone: Confident, formal but warm. Plain English. NO buzzwords (passionate, leverage, synergy, rockstar).
4. Mirror exact technical keywords from the posting where they map to sender's real skills.
5. NEVER fabricate companies, projects, or numbers. If sender lacks specifics, use plausible scope language (e.g., "led migration of payments service" rather than "saved $2M").
6. NEVER use placeholders like [X years], [Company], [Name]. Write naturally.
7. End with: a closing line, then a blank line, then "Sincerely,", then sender's full name on the next line.
8. NO subject line, NO header info (we'll render those separately in the PDF template). Just the salutation through signature.

Respond ONLY with valid JSON (no markdown, no code fences):
{"body":"the full letter from greeting through signature"}`;
}

async function generateCoverLetterText({ profile, recipient, jobTitle, company, jobPosting, apiKey, modelType }) {
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("No Claude API key");

  const prompt = buildCoverLetterPrompt({ profile, recipient, jobTitle, company, jobPosting });

  if (modelType === "openai") {
    const oaiKey = apiKey || process.env.OPENAI_API_KEY;
    if (!oaiKey) throw new Error("No OpenAI API key");
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${oaiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error?.message || "OpenAI failed");
    const text = j.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean).body;
  }

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || "Claude failed");
  const text = j.content?.map(c => c.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean).body;
}

function renderHTML({ profile, body, dateStr }) {
  const senderHeader = [
    profile.name,
    profile.replyTo,
    profile.location,
    profile.linkedin,
    profile.portfolio,
  ].filter(Boolean);

  // Convert plain-text body (with double newlines as paragraph breaks) into HTML paragraphs
  const paragraphs = body
    .split(/\n\s*\n/)
    .map(p => p.replace(/\n/g, "<br/>"))
    .map(p => `<p>${p}</p>`)
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#1a1a1a;background:white;font-size:11pt;line-height:1.55}
  body{padding:60px 70px}
  .header{margin-bottom:36px;padding-bottom:18px;border-bottom:1.5px solid #1a1a1a}
  .name{font-size:22pt;font-weight:700;letter-spacing:-.5px;color:#0a0a0a}
  .contact{margin-top:6px;font-size:9.5pt;color:#555;letter-spacing:.2px}
  .contact span{margin-right:14px}
  .date{margin-bottom:28px;font-size:10pt;color:#666}
  .body p{margin-bottom:11pt;text-align:left}
  .body p:last-child{margin-bottom:0}
</style>
</head>
<body>
  <div class="header">
    <div class="name">${profile.name || ""}</div>
    <div class="contact">
      ${senderHeader.slice(1).map(s => `<span>${s}</span>`).join("")}
    </div>
  </div>
  <div class="date">${dateStr}</div>
  <div class="body">${paragraphs}</div>
</body>
</html>`;
}

async function renderPdf(html, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    ...(CHROME_PATH ? { executablePath: CHROME_PATH } : {}),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close().catch(() => { });
  }
}

async function generate({ profile, recipient, jobTitle, company, jobPosting, apiKey, modelType, outputDir }) {
  const text = await generateCoverLetterText({ profile, recipient, jobTitle, company, jobPosting, apiKey, modelType });
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const html = renderHTML({ profile, body: text, dateStr });

  const safeName = (profile.name || "Cover_Letter").replace(/[^a-zA-Z0-9]+/g, "_");
  const filename = `${Date.now()}-CoverLetter_${safeName}.pdf`;
  const fullPath = path.join(outputDir, filename);
  await renderPdf(html, fullPath);

  return { filename, displayName: `Cover Letter - ${profile.name || "Applicant"}.pdf`, body: text };
}

module.exports = { generate };
