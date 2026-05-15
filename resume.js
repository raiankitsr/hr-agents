// Tailored Resume service — reads the user's base resume (PDF) via Claude Vision,
// extracts structured content, then re-renders a one-page PDF tailored to a
// specific job posting (reorder skills, emphasize relevant experience).

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

function buildPrompt({ profile, jobTitle, company, jobPosting }) {
  const roleTypeLabels = { frontend: "Frontend", backend: "Backend", fullstack: "Full Stack", mobile: "Mobile", devops: "DevOps", data: "Data / ML", design: "Design", pm: "Product", other: "" };
  const senderLines = [
    `Name: ${profile.name || ""}`,
    `Email: ${profile.replyTo || ""}`,
    profile.location && `Location: ${profile.location}`,
    profile.linkedin && `LinkedIn: ${profile.linkedin}`,
    profile.portfolio && `Portfolio/GitHub: ${profile.portfolio}`,
    profile.currentRole && `Current Role: ${profile.currentRole}`,
    profile.experience && `Experience: ${profile.experience}`,
    profile.roleType && `Target type: ${roleTypeLabels[profile.roleType] || profile.roleType}`,
    profile.skills?.length && `Skills declared in profile: ${profile.skills.join(", ")}`,
    profile.about && `Pitch: ${profile.about}`,
  ].filter(Boolean).join("\n");

  return `You are generating a one-page A4 resume tailored to a SPECIFIC job. Recruiter will scan in ~6 seconds. Relevance > completeness.

CANDIDATE PROFILE:
${senderLines}

TARGET ROLE: ${jobTitle || "the open role"}
TARGET COMPANY: ${company || ""}
JOB POSTING (read carefully):
"""
${jobPosting || "(no posting provided)"}
"""

CRITICAL INSTRUCTIONS:
1. If a BASE RESUME PDF is attached: extract their real experience, projects, education, skills from it. Use those as source of truth.
2. If NO base resume is attached: build a credible resume using only the CANDIDATE PROFILE. Use plausible role-aligned bullets based on their declared skills and experience level. Do NOT invent specific companies, dates, or numeric achievements that aren't in the profile.
3. NEVER FABRICATE facts (companies, roles, dates, achievements). Reorder, rephrase, and emphasize what's actually there. For sections with no data, leave the array empty.
4. If the base resume has a project that closely matches the job, give it more prominence. Shorten or omit irrelevant items.
5. Mirror EXACT keywords from the JOB POSTING wherever the candidate's real experience supports it.
6. Aim for 1 page printable. Tight bullets (max 12 words each). 3-5 bullets per role.
7. ALWAYS respond with the JSON schema below — even if some sections are empty arrays. NEVER refuse or output prose.

OUTPUT — strict JSON only, no markdown, no code fences:
{
  "name": "Full Name",
  "contact": {
    "email": "...",
    "phone": "... or empty",
    "location": "... or empty",
    "linkedin": "... or empty",
    "portfolio": "... or empty"
  },
  "summary": "2-3 sentence summary tailored to THIS role. Use posting keywords. State years + primary stack + one concrete strength.",
  "skills": ["8-12 most-relevant skills, role-matching first. Mirror posting terminology when candidate has the skill."],
  "experience": [
    {
      "title": "Role title",
      "company": "Company name",
      "dates": "MMM YYYY – MMM YYYY or 'Present'",
      "location": "City or Remote (optional)",
      "bullets": ["3-5 punchy bullets emphasizing role-relevant work + measurable outcomes when in resume."]
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "tech": "Brief tech stack",
      "bullets": ["1-2 bullets, role-relevant achievements"]
    }
  ],
  "education": [
    {
      "degree": "BSc Computer Science",
      "school": "School name",
      "dates": "YYYY – YYYY",
      "details": "GPA / coursework (optional)"
    }
  ]
}

If a section has nothing relevant, return an empty array. Never invent.`;
}

async function extractTailored({ profile, jobTitle, company, jobPosting, basePdfPath, apiKey }) {
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("No Claude API key");

  const prompt = buildPrompt({ profile, jobTitle, company, jobPosting });
  const content = [{ type: "text", text: prompt }];

  if (basePdfPath && fs.existsSync(basePdfPath)) {
    const data = fs.readFileSync(basePdfPath).toString("base64");
    content.unshift({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data },
    });
  }

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [{ role: "user", content }],
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || "Claude failed");
  const text = j.content?.map(c => c.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

function html(resume) {
  const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const c = resume.contact || {};
  const contactLine = [c.email, c.phone, c.location, c.linkedin, c.portfolio]
    .filter(Boolean)
    .map(esc)
    .join("  ·  ");

  const skillsRow = (resume.skills || []).map(s => `<span class="skill">${esc(s)}</span>`).join("");

  const expBlock = (resume.experience || []).map(e => `
    <div class="entry">
      <div class="entry-head">
        <div><b>${esc(e.title)}</b>${e.company ? ` · <span class="muted">${esc(e.company)}</span>` : ""}</div>
        <div class="muted">${esc(e.dates || "")}${e.location ? ` · ${esc(e.location)}` : ""}</div>
      </div>
      <ul>${(e.bullets || []).map(b => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>
  `).join("");

  const projBlock = (resume.projects || []).map(p => `
    <div class="entry">
      <div class="entry-head">
        <div><b>${esc(p.name)}</b>${p.tech ? ` · <span class="muted">${esc(p.tech)}</span>` : ""}</div>
      </div>
      <ul>${(p.bullets || []).map(b => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>
  `).join("");

  const eduBlock = (resume.education || []).map(e => `
    <div class="entry">
      <div class="entry-head">
        <div><b>${esc(e.degree)}</b>${e.school ? ` · <span class="muted">${esc(e.school)}</span>` : ""}</div>
        <div class="muted">${esc(e.dates || "")}</div>
      </div>
      ${e.details ? `<div class="muted small">${esc(e.details)}</div>` : ""}
    </div>
  `).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#1a1a1a;background:#fff;font-size:10pt;line-height:1.45;-webkit-print-color-adjust:exact}
    body{padding:42px 50px}
    .name{font-size:22pt;font-weight:700;letter-spacing:-.5px;color:#0a0a0a;margin-bottom:3px}
    .contact{font-size:9.5pt;color:#555;margin-bottom:16px;padding-bottom:14px;border-bottom:1.5px solid #1a1a1a}
    .section{margin-top:14px}
    .section-title{font-size:9pt;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#0a0a0a;border-bottom:1px solid #d0d0d0;padding-bottom:3px;margin-bottom:8px}
    .summary{font-size:10pt;color:#222;margin-top:2px}
    .skills{display:flex;flex-wrap:wrap;gap:5px 10px}
    .skill{font-size:9.5pt;color:#0a0a0a;background:#f0f3f7;padding:2px 9px;border-radius:3px;font-weight:500}
    .entry{margin-bottom:9px;page-break-inside:avoid}
    .entry-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;font-size:10pt}
    .muted{color:#555;font-weight:400}
    .small{font-size:9pt}
    ul{margin-left:18px;margin-top:2px}
    li{font-size:9.5pt;margin-bottom:1.5pt;color:#222}
  </style></head><body>
    <div class="name">${esc(resume.name)}</div>
    <div class="contact">${contactLine}</div>

    ${resume.summary ? `<div class="section"><div class="section-title">Summary</div><div class="summary">${esc(resume.summary)}</div></div>` : ""}

    ${(resume.skills || []).length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skillsRow}</div></div>` : ""}

    ${(resume.experience || []).length ? `<div class="section"><div class="section-title">Experience</div>${expBlock}</div>` : ""}

    ${(resume.projects || []).length ? `<div class="section"><div class="section-title">Projects</div>${projBlock}</div>` : ""}

    ${(resume.education || []).length ? `<div class="section"><div class="section-title">Education</div>${eduBlock}</div>` : ""}
  </body></html>`;
}

async function renderPdf(htmlStr, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    ...(CHROME_PATH ? { executablePath: CHROME_PATH } : {}),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(htmlStr, { waitUntil: "networkidle0" });
    await page.pdf({ path: outputPath, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  } finally {
    await browser.close().catch(() => { });
  }
}

async function generate({ profile, jobTitle, company, jobPosting, basePdfPath, apiKey, outputDir }) {
  const tailored = await extractTailored({ profile, jobTitle, company, jobPosting, basePdfPath, apiKey });
  const out = html(tailored);
  const safeName = (profile.name || "Resume").replace(/[^a-zA-Z0-9]+/g, "_");
  const filename = `${Date.now()}-Resume_${safeName}.pdf`;
  const fullPath = path.join(outputDir, filename);
  await renderPdf(out, fullPath);
  return { filename, displayName: `${profile.name || "Resume"} - Resume.pdf` };
}

module.exports = { generate };
