import { useState, useRef, useEffect, useCallback } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');`;

const STYLES = `
${FONT_IMPORT}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;--s3:#21262d;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --green:#3fb950;--green-dim:rgba(63,185,80,.12);
  --red:#f85149;--red-dim:rgba(248,81,73,.12);
  --amber:#e3b341;--amber-dim:rgba(227,179,65,.12);
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
  --r:10px;--rl:14px;
  --sh:0 1px 3px rgba(0,0,0,.4),0 4px 16px rgba(0,0,0,.3);
  --shl:0 8px 32px rgba(0,0,0,.5);
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px}
input,textarea{font-family:var(--sans);font-size:13px;background:var(--bg);color:var(--text);border:1px solid var(--b1);border-radius:var(--r);padding:9px 12px;width:100%;outline:none;transition:border-color .18s,box-shadow .18s}
input:focus,textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-dim)}
input::placeholder,textarea::placeholder{color:var(--t4)}
textarea{resize:vertical;min-height:72px;line-height:1.6}
button{cursor:pointer;font-family:var(--sans)}

.shell{display:flex;flex-direction:column;min-height:100vh;max-width:1200px;margin:0 auto;padding:0 20px 40px}

.topbar{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid var(--b1);position:sticky;top:0;z-index:20;background:var(--bg)}
.tb-logo{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#2f81f7,#1a6fd4);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(47,129,247,.4);flex-shrink:0}
.tb-name{font-size:17px;font-weight:700;letter-spacing:-.3px}
.tb-sub{font-size:11px;color:var(--t3);font-family:var(--mono);margin-top:1px}
.tb-st{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:11px;font-family:var(--mono);color:var(--t3)}
.pip{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green)}
.pip.busy{background:var(--amber);box-shadow:0 0 6px var(--amber);animation:pp 1s infinite}
.pip.err{background:var(--red);box-shadow:0 0 6px var(--red)}
@keyframes pp{0%,100%{opacity:1}50%{opacity:.4}}

.mg{display:grid;grid-template-columns:310px 1fr;gap:20px;margin-top:20px;align-items:start}
@media(max-width:780px){.mg{grid-template-columns:1fr}}

.sb{display:flex;flex-direction:column;gap:14px;position:sticky;top:72px}

.tabs{display:flex;background:var(--bg);border:1px solid var(--b1);border-radius:9px;padding:3px;gap:2px}
.tab{flex:1;padding:7px 10px;border-radius:6px;border:none;background:none;font-size:12px;font-weight:500;color:var(--t3);transition:all .18s}
.tab.on{background:var(--s2);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.3)}
.tab:hover:not(.on){color:var(--t2)}

.panel{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);overflow:hidden}
.ph{padding:12px 16px;border-bottom:1px solid var(--b1);display:flex;align-items:center;justify-content:space-between}
.pt{font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--t3)}
.pbadge{font-size:10px;font-family:var(--mono);padding:2px 8px;border-radius:20px;background:var(--blue-dim);color:var(--blue);border:1px solid var(--blue-glow)}
.pbadge.ok{background:var(--green-dim);color:var(--green);border-color:rgba(63,185,80,.3)}
.pbadge.err{background:var(--red-dim);color:var(--red);border-color:rgba(248,81,73,.3)}
.pb{padding:14px;display:flex;flex-direction:column;gap:10px}

.fl{display:flex;flex-direction:column;gap:5px}
.flb{font-size:11px;font-weight:500;color:var(--t3);letter-spacing:.3px}
.flh{font-size:10px;color:var(--t4);font-family:var(--mono);margin-top:2px}

/* SERVER CONFIG */
.srv-row{display:flex;gap:8px;align-items:flex-end}
.srv-row input{flex:1}
.test-btn{padding:9px 14px;border-radius:var(--r);border:1px solid var(--b2);background:var(--s3);color:var(--t2);font-size:12px;font-family:var(--mono);white-space:nowrap;transition:all .18s;flex-shrink:0}
.test-btn:hover{border-color:var(--blue);color:var(--blue)}
.test-btn:disabled{opacity:.4;cursor:not-allowed}
.srv-note{font-size:10px;font-family:var(--mono);color:var(--t4);line-height:1.6;padding:9px 11px;background:var(--bg);border:1px solid var(--b1);border-radius:8px}
.srv-note b{color:var(--amber)}
.srv-note a{color:var(--blue)}
.srv-st{display:flex;align-items:center;gap:6px;font-size:11px;font-family:var(--mono);padding:8px 11px;border-radius:8px;border:1px solid}
.srv-st.ok{background:var(--green-dim);border-color:rgba(63,185,80,.3);color:var(--green)}
.srv-st.err{background:var(--red-dim);border-color:rgba(248,81,73,.3);color:var(--red)}
.srv-st.chk{background:var(--amber-dim);border-color:rgba(227,179,65,.25);color:var(--amber)}

.dz{border:1.5px dashed var(--b2);border-radius:var(--r);padding:16px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg)}
.dz:hover,.dz.ov{border-color:var(--blue);background:var(--blue-dim)}
.dz-ico{font-size:22px;margin-bottom:4px;opacity:.7}
.dz-txt{font-size:11px;color:var(--t3);font-family:var(--mono);line-height:1.5}
.dz-txt em{color:var(--blue);font-style:normal}

.fchip{display:flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:7px 10px}
.fchip-ico{font-size:15px;flex-shrink:0}
.fchip-nm{flex:1;font-size:11px;font-family:var(--mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--t2)}
.fchip-sz{font-size:10px;color:var(--t4);font-family:var(--mono);flex-shrink:0}
.fchip-rm{background:none;border:none;color:var(--t4);font-size:16px;line-height:1;padding:0 2px;transition:color .15s;flex-shrink:0}
.fchip-rm:hover{color:var(--red)}

.rw{display:flex;flex-direction:column;gap:12px}
.rr{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);overflow:hidden;transition:border-color .2s,box-shadow .2s}
.rr.st-active{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue-dim)}
.rr.st-done{border-color:rgba(63,185,80,.35);box-shadow:0 0 0 1px var(--green-dim)}
.rr.st-sent{border-color:rgba(63,185,80,.55);box-shadow:0 0 0 1px var(--green-dim)}
.rr.st-error{border-color:rgba(248,81,73,.35)}
.rr.st-sending{border-color:var(--amber);box-shadow:0 0 0 1px var(--amber-dim)}
.rt{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--b1);background:var(--s2)}
.rnum{width:22px;height:22px;border-radius:6px;background:var(--s3);display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--mono);color:var(--t3);flex-shrink:0}
.rnum.a{background:var(--blue-dim);color:var(--blue)}
.rnum.d{background:var(--green-dim);color:var(--green)}
.rnum.s{background:var(--amber-dim);color:var(--amber)}
.reml{flex:1;font-size:12px;color:var(--t2);font-family:var(--mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.reml.empty{color:var(--t4)}
.rst{font-size:10px;font-family:var(--mono);padding:3px 8px;border-radius:20px;flex-shrink:0;display:flex;align-items:center;gap:4px}
.rst.idle{background:var(--s3);color:var(--t4)}
.rst.active{background:var(--blue-dim);color:var(--blue)}
.rst.done{background:var(--green-dim);color:var(--green)}
.rst.sending{background:var(--amber-dim);color:var(--amber)}
.rst.sent{background:var(--green-dim);color:var(--green)}
.rst.error{background:var(--red-dim);color:var(--red)}
.rrm{background:none;border:none;color:var(--t4);font-size:18px;line-height:1;padding:0 2px;margin-left:2px;transition:color .15s}
.rrm:hover{color:var(--red)}
.rfs{padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:9px}
.rfs .ff{grid-column:1/-1}
.rfoot{padding:9px 14px;border-top:1px solid var(--b1);background:var(--s2);display:flex;align-items:center;gap:7px;flex-wrap:wrap}

.sb-btn{padding:5px 11px;border-radius:6px;border:1px solid;font-size:11px;font-family:var(--mono);transition:all .18s;display:flex;align-items:center;gap:5px}
.sbprev{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbprev:hover{color:var(--text)}
.sbsend{border-color:rgba(63,185,80,.4);background:var(--green-dim);color:var(--green);font-weight:600}
.sbsend:hover:not(:disabled){background:rgba(63,185,80,.22);border-color:var(--green)}
.sbsend:disabled{opacity:.4;cursor:not-allowed}
.sbgmail{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbgmail:hover{border-color:var(--blue);color:var(--blue)}
.sbcopy{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbcopy:hover{color:var(--text)}

.add-r{padding:12px;border:1.5px dashed var(--b2);border-radius:var(--rl);background:none;color:var(--t3);font-size:12px;font-family:var(--mono);transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px;width:100%}
.add-r:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-dim)}

.abar{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);padding:14px 16px;display:flex;align-items:center;gap:12px}
.pw{flex:1;display:flex;flex-direction:column;gap:6px}
.plbl{font-size:11px;font-family:var(--mono);color:var(--t3);display:flex;align-items:center;gap:6px}
.ptrk{height:4px;background:var(--b1);border-radius:99px;overflow:hidden}
.pfil{height:100%;background:linear-gradient(90deg,var(--blue),#58a6ff);border-radius:99px;transition:width .4s ease}
.pfil.done{background:var(--green)}

.lbtn{padding:11px 26px;background:var(--blue);border:none;border-radius:var(--r);font-family:var(--sans);font-size:14px;font-weight:600;color:#fff;transition:all .2s;display:flex;align-items:center;gap:8px;flex-shrink:0;box-shadow:0 2px 8px rgba(47,129,247,.3)}
.lbtn:hover:not(:disabled){background:#388bfd;box-shadow:0 4px 16px rgba(47,129,247,.45);transform:translateY(-1px)}
.lbtn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.rbtn{padding:11px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:var(--r);font-family:var(--sans);font-size:12px;color:var(--t3);transition:all .2s;flex-shrink:0}
.rbtn:hover{color:var(--text);border-color:var(--b2)}

.savebtn{width:100%;padding:10px;background:var(--s2);border:1px solid var(--b1);border-radius:var(--r);font-family:var(--sans);font-size:13px;font-weight:600;color:var(--text);transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px}
.savebtn:hover{background:var(--s3);border-color:var(--b2)}

.mbg{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(4px);animation:fin .15s ease}
@keyframes fin{from{opacity:0}to{opacity:1}}
.modal{background:var(--s1);border:1px solid var(--b2);border-radius:16px;width:min(640px,96vw);max-height:90vh;display:flex;flex-direction:column;box-shadow:var(--shl);animation:sup .18s ease}
@keyframes sup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.mhd{padding:16px 20px;border-bottom:1px solid var(--b1);display:flex;align-items:flex-start;gap:12px}
.mico{width:36px;height:36px;border-radius:9px;background:var(--blue-dim);border:1px solid var(--blue-glow);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.mto{font-size:11px;font-family:var(--mono);color:var(--t3)}
.mto span{color:var(--blue)}
.msub{font-size:15px;font-weight:600;margin-top:2px;letter-spacing:-.2px}
.mcls{margin-left:auto;background:none;border:none;color:var(--t3);font-size:22px;line-height:1;padding:0 4px;transition:color .15s}
.mcls:hover{color:var(--text)}
.mbdy{padding:20px;overflow-y:auto;flex:1;font-size:13px;line-height:1.75;color:var(--t2);white-space:pre-wrap;font-family:var(--mono)}
.mftr{padding:12px 20px;border-top:1px solid var(--b1);display:flex;align-items:center;gap:8px;background:var(--s2)}
.msnd{padding:9px 20px;background:var(--green);border:none;border-radius:8px;font-family:var(--sans);font-size:13px;font-weight:600;color:#000;transition:all .2s;display:flex;align-items:center;gap:6px}
.msnd:hover:not(:disabled){background:#4ade80;box-shadow:0 4px 16px rgba(63,185,80,.35)}
.msnd:disabled{opacity:.4;cursor:not-allowed}

.toast{position:fixed;bottom:24px;right:24px;z-index:200;background:var(--s2);border:1px solid var(--b2);border-radius:10px;padding:11px 15px;font-size:12px;font-family:var(--mono);box-shadow:var(--shl);display:flex;align-items:center;gap:9px;animation:tin .2s ease;max-width:300px}
@keyframes tin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.toast.ok{border-color:rgba(63,185,80,.4);color:var(--green)}
.toast.err{border-color:rgba(248,81,73,.4);color:var(--red)}
.toast.inf{border-color:var(--blue-glow);color:var(--blue)}

.spin{display:inline-block;animation:sp .8s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.tc::after{content:'▌';animation:bl .7s step-end infinite;margin-left:1px}
@keyframes bl{0%,100%{opacity:1}50%{opacity:0}}
.slbl{font-size:11px;font-weight:600;letter-spacing:.5px;color:var(--t3);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.slbl::after{content:'';flex:1;height:1px;background:var(--b1)}
`;

const fmtSize = b => b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";
const fileEmoji = n => { const e = n.split(".").pop().toLowerCase(); if (e === "pdf") return "📄"; if (["doc", "docx"].includes(e)) return "📝"; if (["jpg", "jpeg", "png", "gif", "webp"].includes(e)) return "🖼️"; return "📎"; };
let TID = 10;

export default function HRAgent({ user, onSignOut }) {
  const [profile, setProfile] = useState({ name: "", replyTo: "", about: "" });
  const [serverUrl, setServerUrl] = useState("http://localhost:3001");
  const [serverStatus, setServerStatus] = useState("idle"); // idle | checking | ok | err
  const [attachments, setAttachments] = useState([]);
  const [drag, setDrag] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [recipients, setRecipients] = useState([
    { id: 1, email: "", jobTitle: "", company: "", note: "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude" }
  ]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [previewRec, setPreviewRec] = useState(null);
  const [toast, setToast] = useState(null);
  const [sideTab, setSideTab] = useState("profile");
  const [savedBadge, setSavedBadge] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef();
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      try { const p = await window.storage.get("hr_profile"); if (p) setProfile(JSON.parse(p.value)); } catch { }
      try { const s = await window.storage.get("hr_server"); if (s) setServerUrl(s.value); } catch { }

      // Load user's persisted attachments from Firestore (avoids Storage CORS listAll)
      if (user) {
        try {
          const colRef = collection(db, "users", user.uid, "attachments");
          const snap = await getDocs(colRef);
          const files = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (files.length) setAttachments(files);
        } catch (err) {
          console.error("Firestore load error:", err);
        }
      }

      setLoaded(true);
    })();
  }, [user]);

  const showToast = (msg, type = "inf") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const saveProfile = async () => {
    try {
      await window.storage.set("hr_profile", JSON.stringify(profile));
      await window.storage.set("hr_server", serverUrl);
      setSavedBadge(true); showToast("Profile saved", "ok");
      setTimeout(() => setSavedBadge(false), 2500);
    } catch { showToast("Save failed", "err"); }
  };

  const testServer = async () => {
    setServerStatus("checking");
    try {
      const res = await fetch(serverUrl.replace(/\/$/, "") + "/", { signal: AbortSignal.timeout(4000) });
      const data = await res.json();
      if (data.status === "ok") { setServerStatus("ok"); showToast("Server connected ✓", "ok"); }
      else { setServerStatus("err"); showToast("Unexpected response", "err"); }
    } catch {
      setServerStatus("err");
      showToast("Cannot reach server — is it running?", "err");
    }
  };

  const handleFiles = useCallback(async (filesArg) => {
    const arr = Array.from(filesArg);
    const existing = new Set(attachments.map(a => a.name));
    const newFiles = arr.filter(f => !existing.has(f.name));
    if (!newFiles.length) return;

    setUploadingFile(true);
    const uploaded = [];
    for (const file of newFiles) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const upRes = await fetch(serverUrl.replace(/\/$/, "") + "/upload", {
          method: "POST",
          body: formData,
        });
        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData.error || "Upload failed");

        const fileData = { 
          name: file.name, 
          size: file.size, 
          url: upData.url, 
          filename: upData.filename // The name on disk
        };
        
        if (user) {
          // Save metadata to Firestore so it persists for this user
          await setDoc(doc(db, "users", user.uid, "attachments", file.name), fileData);
          uploaded.push(fileData);
        } else {
          uploaded.push(fileData);
        }
      } catch (err) { 
        console.error("Upload error:", err);
        uploaded.push({ name: file.name, size: file.size, error: true }); 
      }
    }
    setAttachments(prev => [...prev, ...uploaded]);
    setUploadingFile(false);
    showToast(`${uploaded.length} file${uploaded.length > 1 ? 's' : ''} uploaded`, "ok");
  }, [attachments, user]);

  const upd = (id, k, v) => setRecipients(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));
  const addRec = () => setRecipients(p => [...p, { id: TID++, email: "", jobTitle: "", company: "", note: "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude" }]);
  const rmRec = id => setRecipients(p => p.filter(r => r.id !== id));

  const generateEmail = async rec => {
    const an = attachments.map(a => a.name).join(", ");
    const prompt = `You are an expert professional email writer for job applications and HR outreach. Write a compelling, personalized email.

Sender: ${profile.name || "the applicant"}
${profile.about ? `About sender: ${profile.about}` : ""}
Recipient: ${rec.email}
${rec.jobTitle ? `Applying for: ${rec.jobTitle}` : "Expressing interest in open opportunities"}
${rec.company ? `Company: ${rec.company}` : ""}
${rec.note ? `Notes: ${rec.note}` : ""}
${an ? `Attachments mentioned: ${an}` : ""}

Write email body (150-220 words). Be warm, confident, professional. Reference role/company specifically. End with clear CTA.

Respond ONLY with valid JSON (no markdown):
{"subject":"...","body":"..."}`;

    const res = await fetch(serverUrl.replace(/\/$/, "") + "/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, modelType: rec.preferAi }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Generation failed");
    const text = data.content?.map(i => i.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  };

  const sendViaServer = async (rec) => {
    const base = serverUrl.replace(/\/$/, "");
    const res = await fetch(`${base}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: rec.email,
        subject: rec.subject,
        body: rec.body,
        fromName: profile.name || undefined,
        replyTo: profile.replyTo || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || "Send failed");
    return data;
  };

  const copyEmail = rec => {
    navigator.clipboard.writeText(`Subject: ${rec.subject}\n\n${rec.body}`);
    showToast("Copied to clipboard", "ok");
  };

  const openGmail = rec => {
    const url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(rec.email)}&su=${encodeURIComponent(rec.subject)}&body=${encodeURIComponent(rec.body)}`;
    window.open(url, "_blank");
  };

  const sendOne = async (r) => {
    upd(r.id, "status", "sending");
    try {
      await sendViaServer(r);
      upd(r.id, "status", "sent");
      showToast(`Sent → ${r.email}`, "ok");
    } catch (e) {
      upd(r.id, "status", "done");
      showToast(`Failed: ${e.message}`, "err");
    }
  };

  const runAgent = async () => {
    const valid = recipients.filter(r => r.email.trim());
    if (!valid.length) return;
    setRunning(true); setProgress(0);
    setRecipients(p => p.map(r => ({ ...r, status: "idle", statusMsg: "", subject: "", body: "" })));

    for (let i = 0; i < valid.length; i++) {
      const id = valid[i].id;

      // Step 1: Generate
      setProgressLabel(`Composing ${i + 1}/${valid.length}...`);
      setRecipients(p => p.map(r => r.id === id ? { ...r, status: "active" } : r));
      let result;
      try {
        result = await generateEmail(valid[i]);
        setRecipients(p => p.map(r => r.id === id ? { ...r, subject: result.subject, body: result.body } : r));
      } catch {
        setRecipients(p => p.map(r => r.id === id ? { ...r, status: "error" } : r));
        setProgress(Math.round(((i + 1) / valid.length) * 100));
        continue;
      }

      // Step 2: Send via backend
      if (serverStatus === "ok") {
        setProgressLabel(`Sending to ${valid[i].email}...`);
        setRecipients(p => p.map(r => r.id === id ? { ...r, status: "sending" } : r));
        try {
          await sendViaServer({ ...valid[i], subject: result.subject, body: result.body });
          setRecipients(p => p.map(r => r.id === id ? { ...r, status: "sent" } : r));
          showToast(`Sent → ${valid[i].email}`, "ok");
        } catch (e) {
          setRecipients(p => p.map(r => r.id === id ? { ...r, status: "done" } : r));
          showToast(`Send failed for ${valid[i].email}: ${e.message}`, "err");
        }
      } else {
        setRecipients(p => p.map(r => r.id === id ? { ...r, status: "done" } : r));
      }

      setProgress(Math.round(((i + 1) / valid.length) * 100));
      if (i < valid.length - 1) await new Promise(r => setTimeout(r, 500));
    }

    setProgressLabel("Complete");
    setRunning(false);
  };

  const validCount = recipients.filter(r => r.email.trim()).length;
  const doneCount = recipients.filter(r => ["done", "sent"].includes(r.status)).length;
  const sentCount = recipients.filter(r => r.status === "sent").length;

  if (!loaded) return (
    <><style>{STYLES}</style>
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 12, color: "var(--t3)" }}>Loading...</div>
    </>
  );

  return (
    <><style>{STYLES}</style>
      <div className="shell">

        <div className="topbar">
          <div className="tb-logo">✉️</div>
          <div>
            <div className="tb-name">HR Outreach Agent</div>
            <div className="tb-sub">ai-powered · direct send · professional</div>
          </div>
          <div className="tb-st">
            <div className={`pip ${running ? "busy" : serverStatus === "err" ? "err" : ""}`} />
            {running ? "processing..." : serverStatus === "ok" ? "server connected" : serverStatus === "err" ? "server offline" : "ready"}
            {user && (<>
              <span style={{ color: "var(--b2)", margin: "0 4px" }}>|</span>
              {user.photoURL && <img src={user.photoURL} alt="" style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid var(--b2)", flexShrink: 0 }} />}
              <span style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.displayName?.split(" ")[0]}</span>
              <button onClick={onSignOut} style={{ padding: "3px 9px", borderRadius: 6, border: "1px solid var(--b2)", background: "var(--s3)", color: "var(--t3)", fontSize: 10, fontFamily: "var(--mono)", cursor: "pointer", transition: "color .15s, border-color .15s" }}>
                Sign out
              </button>
            </>)}
          </div>
        </div>

        <div className="mg">

          {/* SIDEBAR */}
          <div className="sb">
            <div className="tabs">
              <button className={`tab ${sideTab === "profile" ? "on" : ""}`} onClick={() => setSideTab("profile")}>Profile</button>
              <button className={`tab ${sideTab === "server" ? "on" : ""}`} onClick={() => setSideTab("server")}>Server</button>
            </div>

            {sideTab === "profile" && (
              <div className="panel">
                <div className="ph"><span className="pt">Your Identity</span>{savedBadge && <span className="pbadge ok">Saved ✓</span>}</div>
                <div className="pb">
                  <div className="fl"><label className="flb">Full Name</label><input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" /></div>
                  <div className="fl"><label className="flb">Reply-To Email</label><input type="email" value={profile.replyTo} onChange={e => setProfile(p => ({ ...p, replyTo: e.target.value }))} placeholder="you@gmail.com" /></div>
                  <div className="fl">
                    <label className="flb">About You</label>
                    <div className="flh">Used to personalize every email</div>
                    <textarea value={profile.about} onChange={e => setProfile(p => ({ ...p, about: e.target.value }))} placeholder="Skills, experience, career goal, education..." style={{ marginTop: 6 }} />
                  </div>
                  <button className="savebtn" onClick={saveProfile}>💾 Save Profile</button>
                </div>
              </div>
            )}

            {sideTab === "server" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">Backend Server</span>
                  {serverStatus === "ok" && <span className="pbadge ok">Connected</span>}
                  {serverStatus === "err" && <span className="pbadge err">Offline</span>}
                </div>
                <div className="pb">
                  <div className="srv-note">
                    <b>Setup:</b> run the Node.js server locally<br />
                    then connect it here to enable direct send.
                  </div>

                  {serverStatus === "ok" && (
                    <div className="srv-st ok">✓ Server reachable — direct send enabled</div>
                  )}
                  {serverStatus === "err" && (
                    <div className="srv-st err">✗ Cannot reach server at this URL</div>
                  )}
                  {serverStatus === "checking" && (
                    <div className="srv-st chk"><span className="spin">⟳</span> Checking...</div>
                  )}

                  <div className="fl">
                    <label className="flb">Server URL</label>
                    <div className="srv-row">
                      <input
                        value={serverUrl}
                        onChange={e => setServerUrl(e.target.value)}
                        placeholder="http://localhost:3001"
                        style={{ fontFamily: "var(--mono)", fontSize: 12 }}
                      />
                      <button className="test-btn" onClick={testServer} disabled={serverStatus === "checking"}>
                        {serverStatus === "checking" ? <span className="spin">⟳</span> : "Test"}
                      </button>
                    </div>
                  </div>

                  <div className="srv-note" style={{ marginTop: 4 }}>
                    If server is <b>offline</b>, emails are still generated — use Gmail link or Copy to send manually.
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="panel">
              <div className="ph">
                <span className="pt">Attachments</span>
                {attachments.length > 0 && <span className="pbadge">{attachments.length} file{attachments.length > 1 ? "s" : ""}</span>}
              </div>
              <div className="pb">
                <div className={`dz ${drag ? "ov" : ""}`}
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => { e.preventDefault(); setDrag(true) }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files) }}
                >
                  <div className="dz-ico">{uploadingFile ? <span className="spin">⟳</span> : "📁"}</div>
                  <div className="dz-txt">{uploadingFile ? <em>Uploading...</em> : <><em>Click to browse</em> or drag &amp; drop<br />Resume · Cover Letter · Portfolio</>}</div>
                </div>
                <input ref={fileRef} type="file" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
                {attachments.map(a => (
                  <div key={a.name} className="fchip">
                    <span className="fchip-ico">{fileEmoji(a.name)}</span>
                    <span className="fchip-nm">{a.name}</span>
                    <span className="fchip-sz">{fmtSize(a.size)}</span>
                    <button className="fchip-rm" onClick={async () => {
                      try { 
                        // Try deleting from backend if filename exists
                        if (a.filename) {
                          await fetch(serverUrl.replace(/\/$/, "") + `/upload/${a.filename}`, { method: "DELETE" });
                        }
                        // Delete metadata from Firestore
                        if (user) await deleteDoc(doc(db, "users", user.uid, "attachments", a.name));
                      } catch (err) { console.error("Delete error:", err); }
                      setAttachments(p => p.filter(x => x.name !== a.name));
                    }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="slbl">Recipients</div>

            <div className="rw">
              {recipients.map((r, i) => (
                <div key={r.id} className={`rr st-${r.status}`}>
                  <div className="rt">
                    <div className={`rnum ${r.status === "active" || r.status === "sending" ? "a" : r.status === "done" || r.status === "sent" ? "d" : ""}`}>
                      {r.status === "done" || r.status === "sent" ? "✓" : r.status === "error" ? "✗" : i + 1}
                    </div>
                    <span className={`reml ${!r.email ? "empty" : ""}`}>{r.email || "No email entered"}</span>

                    {/* Model Toggle */}
                    <div className="tabs" style={{ margin: "0 12px", padding: 2, width: 130, height: 26 }}>
                      <button className={`tab ${r.preferAi === "claude" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "preferAi", "claude")}>Claude</button>
                      <button className={`tab ${r.preferAi === "openai" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "preferAi", "openai")}>ChatGPT</button>
                    </div>

                    <span className={`rst ${r.status}`}>
                      {(r.status === "active" || r.status === "sending") && <span className="spin">⟳</span>}
                      {r.status === "idle" && "pending"}
                      {r.status === "active" && <span className="tc">composing</span>}
                      {r.status === "sending" && <span className="tc">sending</span>}
                      {r.status === "done" && "ready"}
                      {r.status === "sent" && "sent ✓"}
                      {r.status === "error" && "failed"}
                    </span>
                    {!running && recipients.length > 1 && <button className="rrm" onClick={() => rmRec(r.id)}>×</button>}
                  </div>

                  <div className="rfs">
                    <div className="fl ff"><label className="flb">HR Email *</label><input value={r.email} disabled={running} onChange={e => upd(r.id, "email", e.target.value)} placeholder="hr@company.com" type="email" /></div>
                    <div className="fl"><label className="flb">Job Title</label><input value={r.jobTitle} disabled={running} onChange={e => upd(r.id, "jobTitle", e.target.value)} placeholder="e.g. Frontend Engineer" /></div>
                    <div className="fl"><label className="flb">Company</label><input value={r.company} disabled={running} onChange={e => upd(r.id, "company", e.target.value)} placeholder="e.g. Google" /></div>
                    <div className="fl ff"><label className="flb">Extra Note <span style={{ color: "var(--t4)", fontWeight: 400 }}>optional</span></label><input value={r.note} disabled={running} onChange={e => upd(r.id, "note", e.target.value)} placeholder="Referral, specific ask, special context..." /></div>
                  </div>

                  {(r.status === "done" || r.status === "sent") && (
                    <div className="rfoot">
                      <button className="sb-btn sbprev" onClick={() => setPreviewRec(r)}>👁 Preview</button>
                      <button className="sb-btn sbcopy" onClick={() => copyEmail(r)}>📋 Copy</button>
                      <button className="sb-btn sbgmail" onClick={() => openGmail(r)}>↗ Gmail</button>
                      {r.status === "done" && serverStatus === "ok" && (
                        <button className="sb-btn sbsend" onClick={() => sendOne(r)}>
                          ⚡ Send Now
                        </button>
                      )}
                      {r.status === "sent" && <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--green)" }}>✓ Delivered</span>}
                    </div>
                  )}
                  {r.status === "error" && (
                    <div className="rfoot"><span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--red)" }}>✗ Generation failed — check API key</span></div>
                  )}
                </div>
              ))}

              {!running && (
                <button className="add-r" onClick={addRec}>+ Add Recipient</button>
              )}
            </div>

            {/* ACTION BAR */}
            <div className="abar">
              {running ? (
                <div className="pw">
                  <div className="plbl"><span className="spin">⟳</span>{progressLabel}</div>
                  <div className="ptrk"><div className="pfil" style={{ width: progress + "%" }} /></div>
                </div>
              ) : sentCount > 0 ? (
                <div className="pw">
                  <div className="plbl" style={{ color: "var(--green)" }}>✓ {sentCount} sent · {doneCount - sentCount} ready to send</div>
                  <div className="ptrk"><div className="pfil done" style={{ width: "100%" }} /></div>
                </div>
              ) : doneCount > 0 ? (
                <div className="pw">
                  <div className="plbl" style={{ color: "var(--green)" }}>✓ {doneCount} email{doneCount > 1 ? "s" : ""} generated</div>
                  <div className="ptrk"><div className="pfil done" style={{ width: "100%" }} /></div>
                </div>
              ) : (
                <div className="pw">
                  <div className="plbl">{validCount} recipient{validCount !== 1 ? "s" : ""} queued · {serverStatus === "ok" ? "will auto-send via server" : "connect server to auto-send"}</div>
                  <div className="ptrk"><div className="pfil" style={{ width: `${validCount > 0 ? 10 : 0}%` }} /></div>
                </div>
              )}
              {doneCount > 0 && !running && (
                <button className="rbtn" onClick={() => setRecipients(p => p.map(r => ({ ...r, status: "idle", statusMsg: "", subject: "", body: "" })))}>Reset</button>
              )}
              <button className="lbtn" disabled={running || !validCount} onClick={runAgent}>
                {running
                  ? <><span className="spin">⚙</span>Running...</>
                  : serverStatus === "ok"
                    ? <>🚀 Generate & Send</>
                    : <>🚀 Generate Emails</>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {previewRec && (
        <div className="mbg" onClick={e => { if (e.target.className === "mbg") setPreviewRec(null) }}>
          <div className="modal">
            <div className="mhd">
              <div className="mico">✉️</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mto">To: <span>{previewRec.email}</span>{previewRec.company && <> · <span>{previewRec.company}</span></>}</div>
                <div className="msub">{previewRec.subject}</div>
              </div>
              <button className="mcls" onClick={() => setPreviewRec(null)}>×</button>
            </div>
            <div className="mbdy">{previewRec.body}</div>
            <div className="mftr">
              <button className="sb-btn sbcopy" onClick={() => copyEmail(previewRec)}>📋 Copy</button>
              <button className="sb-btn sbgmail" onClick={() => openGmail(previewRec)}>↗ Open in Gmail</button>
              {previewRec.status !== "sent" && serverStatus === "ok" && (
                <button className="msnd" onClick={async () => {
                  const snap = { ...previewRec }; setPreviewRec(null);
                  await sendOne(snap);
                }}>⚡ Send Now</button>
              )}
              {previewRec.status === "sent" && <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--green)" }}>✓ Already sent</span>}
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.type === "ok" ? "✓" : toast.type === "err" ? "✗" : "ℹ"} {toast.msg}</div>}
    </>
  );
}
