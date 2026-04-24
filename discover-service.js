// Discover service — scrapes job boards to find HR emails for a city + role.
// Uses Puppeteer (already bundled with whatsapp-web.js deps).

const puppeteer = require("puppeteer");

const fs = require("fs");
const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];
const CHROME_PATH = CHROME_CANDIDATES.find(p => p && fs.existsSync(p));
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Emails to ignore (common noise on job boards)
const BLOCKLIST = /@(naukri|monster|foundit|indeed|linkedin|shine|timesjobs|freshersworld|example|test|email|domain)\.(com|in|net|org)$/i;

function extractContext(text, email) {
  const idx = text.toLowerCase().indexOf(email.toLowerCase());
  if (idx < 0) return { jobTitle: "", company: "", snippet: "" };
  const start = Math.max(0, idx - 250);
  const end = Math.min(text.length, idx + 250);
  const window = text.slice(start, end).replace(/\s+/g, " ").trim();

  const jobMatch = window.match(/(?:hiring|looking|opening|opportunity|role|position|requirement)[\s:\-]+(?:a\s+|an\s+|for\s+)?([A-Z][\w\s/+\-.&]{2,60})(?:\s+at|\s+@|\n|,|\.)/i);
  const compMatch = window.match(/(?:at|@|for)\s+([A-Z][\w\s.&\-]{2,40})(?:\s|,|\.|\n|$)/);

  return {
    jobTitle: jobMatch ? jobMatch[1].trim() : "",
    company: compMatch ? compMatch[1].trim() : "",
    snippet: window,
  };
}

// Known Ahmedabad IT company careers pages (seed list)
const AHMEDABAD_COMPANIES = [
  { name: "Infibeam", url: "https://www.infibeam.com/careers" },
  { name: "eInfochips", url: "https://www.einfochips.com/careers/" },
  { name: "Tatvasoft", url: "https://www.tatvasoft.com/careers" },
  { name: "Bacancy", url: "https://www.bacancytechnology.com/careers" },
  { name: "Cybage", url: "https://www.cybage.com/careers" },
  { name: "Azilen", url: "https://www.azilen.com/careers/" },
  { name: "Cygnet Infotech", url: "https://www.cygnet-infotech.com/careers" },
  { name: "Crest Infosystems", url: "https://www.crestinfosystems.com/careers/" },
  { name: "Amar Infotech", url: "https://www.amarinfotech.com/careers.html" },
  { name: "Techforce", url: "https://techforceinfotech.com/careers/" },
  { name: "Radix Technologies", url: "https://radixweb.com/career" },
  { name: "Peerbits", url: "https://www.peerbits.com/company/careers.html" },
  { name: "Softvan", url: "https://www.softvan.in/careers/" },
  { name: "Credencys", url: "https://www.credencys.com/career/" },
  { name: "Helios Solutions", url: "https://www.heliossolutions.co/careers" },
];

async function scrapeUrl(browser, url, timeout = 30000) {
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout });
    // Let dynamic content render
    await new Promise(r => setTimeout(r, 2000));
    const text = await page.evaluate(() => document.body?.innerText || "");
    return text;
  } catch (err) {
    return "";
  } finally {
    await page.close().catch(() => {});
  }
}

function extractEmailsFromText(text, source) {
  const found = [];
  const seen = new Set();
  const matches = text.match(EMAIL_RE) || [];
  for (const raw of matches) {
    const email = raw.toLowerCase();
    if (seen.has(email)) continue;
    if (BLOCKLIST.test(email)) continue;
    seen.add(email);
    const ctx = extractContext(text, email);
    found.push({
      email,
      company: ctx.company,
      jobTitle: ctx.jobTitle,
      snippet: ctx.snippet,
      source,
    });
  }
  return found;
}

async function discover({ city = "ahmedabad", role = "software engineer" } = {}) {
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const roleSlug = role.toLowerCase().replace(/\s+/g, "-");

  const sources = [
    // Naukri
    { name: `Naukri: ${role} ${city}`, url: `https://www.naukri.com/${roleSlug}-jobs-in-${citySlug}` },
    // Foundit (formerly Monster)
    { name: `Foundit: ${role} ${city}`, url: `https://www.foundit.in/search/${roleSlug}-jobs-in-${citySlug}` },
    // Hirist (dev-focused board)
    { name: `Hirist: ${role} ${city}`, url: `https://www.hirist.com/k/${roleSlug}-jobs-in-${citySlug}.html` },
    // Instahyre
    { name: `Instahyre: ${role} ${city}`, url: `https://www.instahyre.com/search-jobs-in-${citySlug}/?q=${encodeURIComponent(role)}` },
  ];

  // Seed companies if city is Ahmedabad
  const companySources = citySlug === "ahmedabad"
    ? AHMEDABAD_COMPANIES.map(c => ({ name: `${c.name} careers`, url: c.url }))
    : [];

  const allSources = [...sources, ...companySources];

  const browser = await puppeteer.launch({
    headless: true,
    ...(CHROME_PATH ? { executablePath: CHROME_PATH } : {}),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const allResults = [];
  const sourcesSummary = [];

  try {
    // Scrape in batches of 5 to avoid overwhelming Chrome
    for (let i = 0; i < allSources.length; i += 5) {
      const batch = allSources.slice(i, i + 5);
      const texts = await Promise.all(
        batch.map(src => scrapeUrl(browser, src.url).catch(() => ""))
      );
      for (let j = 0; j < batch.length; j++) {
        const src = batch[j];
        const text = texts[j];
        if (!text) {
          sourcesSummary.push({ name: src.name, found: 0, error: true });
          continue;
        }
        const emails = extractEmailsFromText(text, src.name);
        sourcesSummary.push({ name: src.name, found: emails.length, error: false });
        for (const e of emails) {
          allResults.push({
            ...e,
            groupId: `discover-${citySlug}`,
            groupName: src.name,
            ts: Date.now(),
          });
        }
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  // Deduplicate by email across all sources
  const dedupe = new Map();
  for (const r of allResults) {
    if (!dedupe.has(r.email)) dedupe.set(r.email, r);
  }

  return {
    city,
    role,
    totalFound: dedupe.size,
    sources: sourcesSummary,
    items: Array.from(dedupe.values()),
  };
}

module.exports = { discover };
