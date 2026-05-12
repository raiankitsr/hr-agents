// Gmail API client — reads sent-email replies for the History tab.
// Uses the OAuth access token captured during Google sign-in (sessionStorage).
// All queries are read-only via gmail.readonly scope.

const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me";

function authHeaders(token) {
  if (!token) throw new Error("No Gmail access token — sign out and back in to re-authorize.");
  return { Authorization: `Bearer ${token}` };
}

// Search Gmail for any inbox message from `senderEmail` received after `sentAt` (ms).
// Returns the most recent matching message metadata, or null.
async function findReplyFrom(token, senderEmail, sentAt) {
  // Gmail "after:" uses unix-seconds. Cap to a 90-day window to keep queries lightweight.
  const afterSec = Math.floor(sentAt / 1000);
  const q = `from:${senderEmail} in:anywhere after:${afterSec}`;
  const url = `${GMAIL_API}/messages?q=${encodeURIComponent(q)}&maxResults=5`;
  const r = await fetch(url, { headers: authHeaders(token) });
  if (!r.ok) {
    if (r.status === 401) throw new Error("Gmail access expired. Sign out + back in to re-authorize.");
    if (r.status === 403) throw new Error("Gmail access denied. Re-authorize and grant 'Read Gmail' on sign-in.");
    const t = await r.text();
    throw new Error(`Gmail search failed (${r.status}): ${t.slice(0, 200)}`);
  }
  const data = await r.json();
  const msgs = data.messages || [];
  if (!msgs.length) return null;

  // Fetch metadata of the most recent message
  const meta = await fetch(`${GMAIL_API}/messages/${msgs[0].id}?format=metadata&metadataHeaders=From&metadataHeaders=Date&metadataHeaders=Subject`, {
    headers: authHeaders(token),
  });
  if (!meta.ok) return null;
  const m = await meta.json();
  const headers = Object.fromEntries((m.payload?.headers || []).map(h => [h.name.toLowerCase(), h.value]));
  return {
    messageId: m.id,
    threadId: m.threadId,
    from: headers.from || senderEmail,
    subject: headers.subject || "",
    receivedAt: parseInt(m.internalDate, 10) || Date.now(),
  };
}

// Scan a list of history entries, return ones that have replies.
// Updates each entry: { ...entry, replied: true, repliedAt, replyFrom, replySubject }
// onProgress callback fires per entry: (current, total)
async function scanReplies(token, historyEntries, onProgress) {
  const results = [];
  let i = 0;
  for (const entry of historyEntries) {
    i++;
    if (onProgress) onProgress(i, historyEntries.length);
    if (entry.status !== "sent" || !entry.email || !entry.sentAt) {
      results.push(entry);
      continue;
    }
    if (entry.replied) {
      // Already detected — skip re-query
      results.push(entry);
      continue;
    }
    try {
      const reply = await findReplyFrom(token, entry.email, entry.sentAt);
      if (reply) {
        results.push({
          ...entry,
          replied: true,
          repliedAt: reply.receivedAt,
          replyFrom: reply.from,
          replySubject: reply.subject,
        });
      } else {
        results.push(entry);
      }
    } catch (err) {
      // Surface the error on the first entry; subsequent ones too if it's auth-level
      results.push({ ...entry, _scanError: err.message });
      if (/expired|denied|access/i.test(err.message)) throw err;
    }
    // Mild pacing — Gmail allows ~250 quota units/sec; this stays well under
    await new Promise(r => setTimeout(r, 80));
  }
  return results;
}

export { findReplyFrom, scanReplies };
