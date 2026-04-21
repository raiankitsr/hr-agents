import { useState, useRef, useEffect, useCallback } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
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

.hlist{display:flex;flex-direction:column;gap:8px;max-height:520px;overflow-y:auto;padding-right:2px}
.hempty{text-align:center;padding:28px 10px;font-size:11px;font-family:var(--mono);color:var(--t4);line-height:1.7}
.hitem{background:var(--s2);border:1px solid var(--b1);border-radius:10px;padding:10px 12px;cursor:pointer;transition:border-color .15s,background .15s;display:flex;flex-direction:column;gap:5px}
.hitem:hover{border-color:var(--b2);background:var(--s3)}
.hitem.ok{border-left:2px solid var(--green)}
.hitem.err{border-left:2px solid var(--red)}
.hi-row{display:flex;align-items:center;gap:8px}
.hi-co{flex:1;font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hi-time{font-size:10px;color:var(--t4);font-family:var(--mono);flex-shrink:0}
.hi-sub{font-size:11px;color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}
.hi-email{font-size:10px;font-family:var(--mono);color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hi-meta{display:flex;align-items:center;gap:8px;font-size:10px;font-family:var(--mono);color:var(--t4);margin-top:1px}
.hi-att{color:var(--blue)}
.hi-clr{background:none;border:none;color:var(--t4);font-size:10px;font-family:var(--mono);cursor:pointer;padding:0;transition:color .15s}
.hi-clr:hover{color:var(--red)}

.wa-qr{display:flex;justify-content:center;padding:10px}
.wa-qr img{border-radius:10px;border:1px solid var(--b1)}
.wa-sts{display:flex;align-items:center;gap:6px;font-size:11px;font-family:var(--mono);padding:8px 11px;border-radius:8px;border:1px solid}
.wa-sts.ready{background:var(--green-dim);border-color:rgba(63,185,80,.3);color:var(--green)}
.wa-sts.off{background:var(--s2);border-color:var(--b1);color:var(--t4)}
.wa-sts.wait{background:var(--amber-dim);border-color:rgba(227,179,65,.25);color:var(--amber)}
.wa-btn{width:100%;padding:10px;border-radius:var(--r);font-family:var(--sans);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s}
.wa-connect{background:var(--green-dim);border:1px solid rgba(63,185,80,.35);color:var(--green)}
.wa-connect:hover{background:rgba(63,185,80,.22);border-color:var(--green)}
.wa-disconnect{background:var(--red-dim);border:1px solid rgba(248,81,73,.3);color:var(--red)}
.wa-disconnect:hover{background:rgba(248,81,73,.18);border-color:var(--red)}
.grp-list{display:flex;flex-direction:column;gap:5px;max-height:280px;overflow-y:auto}
.grp-item{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;cursor:pointer;transition:border-color .15s}
.grp-item:hover{border-color:var(--b2)}
.grp-item.watched{border-color:rgba(63,185,80,.4);background:var(--green-dim)}
.grp-item input[type=checkbox]{accent-color:var(--green)}
.grp-nm{flex:1;font-size:12px;font-family:var(--sans);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#e6edf3 !important;font-weight:500}

.inbox-item{background:var(--s2);border:1px solid var(--b1);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:5px;transition:border-color .15s}
.inbox-item:hover{border-color:var(--b2)}
.inbox-item.applied{opacity:.5;border-left:2px solid var(--green)}
.inbox-item.dismissed{opacity:.35;border-left:2px solid var(--t4)}
.inbox-snip{font-size:10px;color:var(--t4);font-family:var(--mono);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.inbox-acts{display:flex;gap:6px;margin-top:3px}
.inbox-apply{padding:4px 12px;border-radius:6px;border:1px solid rgba(63,185,80,.4);background:var(--green-dim);color:var(--green);font-size:10px;font-family:var(--mono);font-weight:600;cursor:pointer;transition:all .15s}
.inbox-apply:hover{background:rgba(63,185,80,.22);border-color:var(--green)}
.inbox-dismiss{padding:4px 10px;border-radius:6px;border:1px solid var(--b1);background:var(--s3);color:var(--t4);font-size:10px;font-family:var(--mono);cursor:pointer;transition:all .15s}
.inbox-dismiss:hover{color:var(--red);border-color:rgba(248,81,73,.3)}
`;

const fmtSize = b => b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";
const fileEmoji = n => { const e = n.split(".").pop().toLowerCase(); if (e === "pdf") return "📄"; if (["doc", "docx"].includes(e)) return "📝"; if (["jpg", "jpeg", "png", "gif", "webp"].includes(e)) return "🖼️"; return "📎"; };
let TID = 10;

// API base resolves from Vite env at build time; empty string => same-origin relative URLs.
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export default function HRAgent({ user, onSignOut }) {
  const [profile, setProfile] = useState({ name: "", replyTo: "", about: "" });
  const [serverReady, setServerReady] = useState(false);
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
  const [savedBadge, setSavedBadge] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sideTab, setSideTab] = useState("profile");
  const [history, setHistory] = useState([]);
  const [historyPreview, setHistoryPreview] = useState(null);
  const [failedMails, setFailedMails] = useState([]);
  const [inboxPreview, setInboxPreview] = useState(null);
  const [waStatus, setWaStatus] = useState({ status: "idle", qrDataUrl: null, watchedGroups: [], inboxCount: 0 });
  const [waGroups, setWaGroups] = useState([]);
  const [waInbox, setWaInbox] = useState([]);
  const [waLoading, setWaLoading] = useState(false);
  const [waSelectedGroup, setWaSelectedGroup] = useState(null);
  const [waRoleFilter, setWaRoleFilter] = useState("");
  const [waProcessing, setWaProcessing] = useState(false);
  const fileRef = useRef();
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      try { const p = await window.storage.get("hr_profile"); if (p) setProfile(JSON.parse(p.value)); } catch { }

      // Ping backend once on boot to toggle header status
      try {
        const res = await fetch(`${API_BASE}/`, { signal: AbortSignal.timeout(4000) });
        const data = await res.json();
        setServerReady(data?.status === "ok");
      } catch { setServerReady(false); }

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

        // Load send history, newest first
        try {
          const hRef = collection(db, "users", user.uid, "history");
          const hSnap = await getDocs(query(hRef, orderBy("sentAt", "desc"), limit(200)));
          setHistory(hSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
          console.error("History load error:", err);
        }
      }

      setLoaded(true);
    })();
  }, [user]);

  const recordHistory = async (rec, status, errorMsg) => {
    const entry = {
      sentAt: Date.now(),
      email: rec.email,
      company: rec.company || "",
      jobTitle: rec.jobTitle || "",
      subject: rec.subject || "",
      body: rec.body || "",
      note: rec.note || "",
      status, // "sent" | "failed"
      error: errorMsg || "",
      attachments: attachments.map(a => ({ name: a.name, filename: a.filename })),
    };
    const id = `${entry.sentAt}-${Math.random().toString(36).slice(2, 8)}`;
    setHistory(p => [{ id, ...entry }, ...p]);
    if (user) {
      try { await setDoc(doc(db, "users", user.uid, "history", id), entry); }
      catch (err) { console.error("History save error:", err); }
    }
  };

  const clearHistory = async () => {
    if (!confirm("Clear all history? This cannot be undone.")) return;
    const snapshot = history;
    setHistory([]);
    if (user) {
      try {
        await Promise.all(snapshot.map(h => deleteDoc(doc(db, "users", user.uid, "history", h.id))));
      } catch (err) { console.error("History clear error:", err); }
    }
    showToast("History cleared", "ok");
  };

  const fmtRelTime = (ts) => {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
    return new Date(ts).toLocaleDateString();
  };

  const showToast = (msg, type = "inf") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const saveProfile = async () => {
    try {
      await window.storage.set("hr_profile", JSON.stringify(profile));
      setSavedBadge(true); showToast("Profile saved", "ok");
      setTimeout(() => setSavedBadge(false), 2500);
    } catch { showToast("Save failed", "err"); }
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
        const upRes = await fetch(`${API_BASE}/upload`, {
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

  // ── WhatsApp helpers ─────────────────────────────────────────────
  const waFetch = async (path, opts) => {
    const res = await fetch(`${API_BASE}${path}`, opts);
    return res.json();
  };

  const pollWaStatus = useCallback(async () => {
    try {
      const s = await waFetch("/wa/status");
      setWaStatus(s);
      if (s.inboxCount > 0) {
        const { inbox } = await waFetch("/wa/inbox");
        setWaInbox(inbox || []);
      }
    } catch { }
  }, []);

  // Poll WA status every 15s when the WhatsApp or Inbox tab is open
  useEffect(() => {
    if (sideTab !== "whatsapp" && sideTab !== "inbox") return;
    pollWaStatus();
    const iv = setInterval(pollWaStatus, 15000);
    return () => clearInterval(iv);
  }, [sideTab, pollWaStatus]);

  // Auto-load groups when WA becomes ready
  useEffect(() => {
    if (waStatus.status === "ready" && waGroups.length === 0) waLoadGroups();
  }, [waStatus.status]);

  const waConnect = async () => {
    setWaLoading(true);
    try {
      const s = await waFetch("/wa/start", { method: "POST" });
      setWaStatus(s);
      // QR takes a moment; poll quickly
      setTimeout(pollWaStatus, 2000);
      setTimeout(pollWaStatus, 5000);
    } catch (e) { showToast("WA connect failed: " + e.message, "err"); }
    setWaLoading(false);
  };

  const waDisconnect = async () => {
    setWaLoading(true);
    try {
      await waFetch("/wa/logout", { method: "POST" });
      setWaStatus({ status: "idle", qrDataUrl: null, watchedGroups: [], inboxCount: 0 });
      setWaGroups([]);
      setWaInbox([]);
    } catch (e) { showToast("WA disconnect failed: " + e.message, "err"); }
    setWaLoading(false);
  };

  const waLoadGroups = async () => {
    try {
      const { groups } = await waFetch("/wa/groups");
      setWaGroups(groups || []);
    } catch (e) { showToast("Failed to load groups: " + e.message, "err"); }
  };

  const waToggleGroup = async (groupId) => {
    const current = waStatus.watchedGroups || [];
    const next = current.includes(groupId)
      ? current.filter(id => id !== groupId)
      : [...current, groupId];
    try {
      const { watchedGroups } = await waFetch("/wa/watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupIds: next }),
      });
      setWaStatus(p => ({ ...p, watchedGroups }));
      setWaGroups(g => g.map(grp => ({ ...grp, watched: watchedGroups.includes(grp.id) })));
    } catch (e) { showToast("Failed: " + e.message, "err"); }
  };

  const waProcessGroup = async () => {
    if (!waSelectedGroup) return;
    setWaProcessing(true);
    try {
      const result = await waFetch("/wa/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: waSelectedGroup.id, role: waRoleFilter }),
      });
      showToast(`Scanned ${result.processed} messages, found ${result.found} new email(s)`, "ok");
      // Refresh inbox
      const { inbox } = await waFetch("/wa/inbox");
      setWaInbox(inbox || []);
      if (result.found > 0) setSideTab("inbox");
    } catch (e) {
      showToast("Process failed: " + e.message, "err");
    }
    setWaProcessing(false);
  };

  const inboxApply = async (item) => {
    await waFetch(`/wa/inbox/${item.id}/apply`, { method: "POST" });
    // Remove from inbox — it goes to recipients, then history on send
    setWaInbox(p => p.filter(x => x.id !== item.id));
    const newRec = { id: TID++, email: item.email, jobTitle: item.jobTitle || "", company: item.company || "", note: item.snippet?.slice(0, 120) || "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude" };
    setRecipients(p => [...p, newRec]);
    showToast(`Added ${item.email} to recipients`, "ok");
  };

  const inboxDismiss = async (id) => {
    await waFetch(`/wa/inbox/${id}/dismiss`, { method: "POST" });
    setWaInbox(p => p.filter(x => x.id !== id));
  };

  const inboxApplyAll = async () => {
    const pending = waInbox.filter(x => x.status === "pending");
    if (!pending.length) return;
    for (const item of pending) {
      await inboxApply(item);
    }
    showToast(`Added ${pending.length} recipients`, "ok");
  };

  const pendingInboxCount = waInbox.filter(x => x.status === "pending").length;
  const failedCount = failedMails.filter(r => r.status === "failed").length;

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

    const res = await fetch(`${API_BASE}/generate`, {
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
    const res = await fetch(`${API_BASE}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: rec.email,
        subject: rec.subject,
        body: rec.body,
        fromName: profile.name || undefined,
        replyTo: profile.replyTo || undefined,
        attachments: attachments.map(a => ({ name: a.name, filename: a.filename })),
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

  const retryOne = async (r) => {
    setFailedMails(p => p.map(f => f.id === r.id ? { ...f, status: "retrying" } : f));
    try {
      const result = await generateEmail(r);
      const merged = { ...r, subject: result.subject, body: result.body };
      await sendViaServer(merged);
      showToast(`Sent → ${r.email}`, "ok");
      recordHistory(merged, "sent");
      setFailedMails(p => p.filter(f => f.id !== r.id));
    } catch (e) {
      setFailedMails(p => p.map(f => f.id === r.id ? { ...f, status: "failed", error: e.message } : f));
      showToast(`Retry failed: ${e.message}`, "err");
    }
  };

  const retryAllFailed = async () => {
    const toRetry = failedMails.filter(r => r.status === "failed");
    if (!toRetry.length) return;
    setRunning(true);
    for (let i = 0; i < toRetry.length; i++) {
      setProgressLabel(`Retrying ${i + 1}/${toRetry.length}...`);
      setProgress(Math.round(((i + 1) / toRetry.length) * 100));
      await retryOne(toRetry[i]);
      if (i < toRetry.length - 1) await new Promise(r => setTimeout(r, 500));
    }
    setProgressLabel("Complete");
    setRunning(false);
  };

  const sendOne = async (r) => {
    upd(r.id, "status", "sending");
    try {
      await sendViaServer(r);
      showToast(`Sent → ${r.email}`, "ok");
      recordHistory(r, "sent");
      // Remove from recipients on success
      setRecipients(p => p.filter(x => x.id !== r.id));
    } catch (e) {
      showToast(`Failed: ${e.message}`, "err");
      recordHistory(r, "failed", e.message);
      // Move to failed list
      setFailedMails(p => [...p, { ...r, status: "failed", error: e.message, failedAt: Date.now() }]);
      setRecipients(p => p.filter(x => x.id !== r.id));
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
      setProgressLabel(`Sending to ${valid[i].email}...`);
      setRecipients(p => p.map(r => r.id === id ? { ...r, status: "sending" } : r));
      const mergedRec = { ...valid[i], subject: result.subject, body: result.body };
      try {
        await sendViaServer(mergedRec);
        showToast(`Sent → ${valid[i].email}`, "ok");
        recordHistory(mergedRec, "sent");
        setRecipients(p => p.filter(r => r.id !== id));
      } catch (e) {
        showToast(`Send failed for ${valid[i].email}: ${e.message}`, "err");
        recordHistory(mergedRec, "failed", e.message);
        setFailedMails(p => [...p, { ...mergedRec, id, status: "failed", error: e.message, failedAt: Date.now() }]);
        setRecipients(p => p.filter(r => r.id !== id));
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
            <div className={`pip ${running ? "busy" : serverReady ? "" : "err"}`} />
            {running ? "processing..." : serverReady ? "ready" : "server offline"}
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
              <button className={`tab ${sideTab === "whatsapp" ? "on" : ""}`} onClick={() => setSideTab("whatsapp")}>WA</button>
              <button className={`tab ${sideTab === "inbox" ? "on" : ""}`} onClick={() => setSideTab("inbox")}>
                Inbox{pendingInboxCount > 0 && ` · ${pendingInboxCount}`}
              </button>
              <button className={`tab ${sideTab === "failed" ? "on" : ""}`} onClick={() => setSideTab("failed")}>
                Failed{failedCount > 0 && ` · ${failedCount}`}
              </button>
              <button className={`tab ${sideTab === "history" ? "on" : ""}`} onClick={() => setSideTab("history")}>
                History{history.length > 0 && ` · ${history.length}`}
              </button>
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

            {sideTab === "failed" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">Failed</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {failedCount > 0 && (
                      <button className="inbox-apply" onClick={retryAllFailed} disabled={running} style={{ fontSize: 9, padding: "3px 8px", background: "var(--red-dim)", borderColor: "rgba(248,81,73,.3)", color: "var(--red)" }}>
                        ↻ Retry All ({failedCount})
                      </button>
                    )}
                    {failedMails.length > 0 && (
                      <button className="hi-clr" onClick={() => setFailedMails([])}>Clear</button>
                    )}
                  </div>
                </div>
                <div className="pb">
                  {failedMails.length === 0 ? (
                    <div className="hempty">
                      No failed emails.<br />
                      Failed sends will appear here for retry.
                    </div>
                  ) : (
                    <div className="hlist">
                      {failedMails.map(f => (
                        <div key={f.id} className="inbox-item" style={{ borderLeftColor: f.status === "retrying" ? "var(--amber)" : "var(--red)", borderLeftWidth: 2 }}>
                          <div className="hi-row">
                            <div className="hi-co">{f.company || f.email}</div>
                            <div className="hi-time">{fmtRelTime(f.failedAt)}</div>
                          </div>
                          <div className="hi-email">{f.email}</div>
                          {f.jobTitle && <div className="hi-sub">{f.jobTitle}</div>}
                          {f.subject && <div className="hi-sub" style={{ color: "var(--t3)" }}>{f.subject}</div>}
                          <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--red)", lineHeight: 1.4 }}>
                            {f.status === "retrying" ? <><span className="spin">⟳</span> Retrying...</> : `✗ ${f.error || "Send failed"}`}
                          </div>
                          {f.status === "failed" && (
                            <div className="inbox-acts">
                              <button className="inbox-apply" onClick={() => retryOne(f)} style={{ background: "var(--amber-dim)", borderColor: "rgba(227,179,65,.3)", color: "var(--amber)" }}>↻ Retry</button>
                              <button className="inbox-dismiss" onClick={() => setFailedMails(p => p.filter(x => x.id !== f.id))}>✗ Remove</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {sideTab === "history" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">Send History</span>
                  {history.length > 0 && (
                    <button className="hi-clr" onClick={clearHistory}>Clear all</button>
                  )}
                </div>
                <div className="pb">
                  {history.length === 0 ? (
                    <div className="hempty">
                      No sends yet.<br />
                      Every successful email will show up here.
                    </div>
                  ) : (
                    <div className="hlist">
                      {history.map(h => (
                        <div
                          key={h.id}
                          className={`hitem ${h.status === "sent" ? "ok" : "err"}`}
                          onClick={() => setHistoryPreview(h)}
                        >
                          <div className="hi-row">
                            <div className="hi-co">
                              {h.company || h.jobTitle || h.email}
                            </div>
                            <div className="hi-time">{fmtRelTime(h.sentAt)}</div>
                          </div>
                          {h.jobTitle && h.company && (
                            <div className="hi-sub">{h.jobTitle}</div>
                          )}
                          <div className="hi-email">{h.email}</div>
                          <div className="hi-meta">
                            <span style={{ color: h.status === "sent" ? "var(--green)" : "var(--red)" }}>
                              {h.status === "sent" ? "✓ Delivered" : "✗ Failed"}
                            </span>
                            {h.attachments?.length > 0 && (
                              <span className="hi-att">📎 {h.attachments.length}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {sideTab === "whatsapp" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">WhatsApp Sync</span>
                  {waStatus.status === "ready" && <span className="pbadge ok">Connected</span>}
                  {waStatus.status === "qr" && <span className="pbadge" style={{ color: "var(--amber)" }}>Scan QR</span>}
                </div>
                <div className="pb">
                  {waStatus.status === "idle" && (
                    <>
                      <div className="wa-sts off">Not connected — click below to link your WhatsApp</div>
                      <button className="wa-btn wa-connect" onClick={waConnect} disabled={waLoading}>
                        {waLoading ? <><span className="spin">⟳</span>Connecting...</> : "Connect WhatsApp"}
                      </button>
                    </>
                  )}

                  {(waStatus.status === "initializing" || waStatus.status === "authenticated") && (
                    <div className="wa-sts wait"><span className="spin">⟳</span> Initializing...</div>
                  )}

                  {waStatus.status === "qr" && waStatus.qrDataUrl && (
                    <>
                      <div className="wa-sts wait">Scan this QR from WhatsApp mobile</div>
                      <div className="wa-qr"><img src={waStatus.qrDataUrl} alt="QR" width={260} height={260} /></div>
                      <div className="flh" style={{ textAlign: "center" }}>WhatsApp → Linked Devices → Link a Device</div>
                    </>
                  )}

                  {waStatus.status === "ready" && (
                    <>
                      <div className="wa-sts ready">✓ WhatsApp linked</div>

                      {/* Step 1: Select group */}
                      <div className="fl" style={{ marginTop: 6 }}>
                        <div className="flb" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span>Select Group</span>
                          <button className="hi-clr" onClick={waLoadGroups} style={{ color: "var(--blue)" }}>Refresh</button>
                        </div>
                        {waGroups.length === 0 ? (
                          <button className="wa-btn" style={{ background: "var(--s2)", border: "1px solid var(--b1)", color: "var(--t2)" }} onClick={waLoadGroups}>
                            Load Groups
                          </button>
                        ) : (
                          <div className="grp-list">
                            {waGroups.map(g => (
                              <div
                                key={g.id}
                                className={`grp-item ${waSelectedGroup?.id === g.id ? "watched" : ""}`}
                                onClick={() => setWaSelectedGroup(waSelectedGroup?.id === g.id ? null : g)}
                                style={{ cursor: "pointer" }}
                              >
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: waSelectedGroup?.id === g.id ? "var(--green)" : "var(--b2)", flexShrink: 0, boxShadow: waSelectedGroup?.id === g.id ? "0 0 6px var(--green)" : "none" }} />
                                <div style={{ flex: 1, fontSize: 12, color: "#e6edf3", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{g.name || "(unnamed)"}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Step 2: Role filter + Process button */}
                      {waSelectedGroup && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6, padding: 10, background: "var(--bg)", border: "1px solid var(--b1)", borderRadius: 10 }}>
                          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)" }}>
                            Scanning: <span style={{ color: "var(--text)", fontWeight: 600 }}>{waSelectedGroup.name}</span>
                          </div>
                          <div className="fl">
                            <label className="flb">Role / Keywords <span style={{ color: "var(--t4)", fontWeight: 400 }}>optional</span></label>
                            <input
                              value={waRoleFilter}
                              onChange={e => setWaRoleFilter(e.target.value)}
                              placeholder="e.g. Frontend Developer, React, SDE"
                              style={{ fontSize: 12 }}
                            />
                            <div className="flh">Only messages matching these keywords will be scanned. Leave empty for all.</div>
                          </div>
                          <button
                            className="wa-btn wa-connect"
                            onClick={waProcessGroup}
                            disabled={waProcessing}
                            style={{ marginTop: 2 }}
                          >
                            {waProcessing ? <><span className="spin">⟳</span> Processing...</> : <>🔍 Process Group</>}
                          </button>
                        </div>
                      )}

                      <button className="wa-btn wa-disconnect" onClick={waDisconnect} disabled={waLoading} style={{ marginTop: 8 }}>
                        {waLoading ? <><span className="spin">⟳</span>...</> : "Disconnect WhatsApp"}
                      </button>
                    </>
                  )}

                  {waStatus.status === "auth_failure" && (
                    <>
                      <div className="wa-sts" style={{ background: "var(--red-dim)", borderColor: "rgba(248,81,73,.3)", color: "var(--red)" }}>
                        ✗ Authentication failed — try reconnecting
                      </div>
                      <button className="wa-btn wa-connect" onClick={waConnect} disabled={waLoading}>Reconnect</button>
                    </>
                  )}

                  {waStatus.status === "disconnected" && (
                    <>
                      <div className="wa-sts off">Disconnected</div>
                      <button className="wa-btn wa-connect" onClick={waConnect} disabled={waLoading}>Reconnect</button>
                    </>
                  )}
                </div>
              </div>
            )}

            {sideTab === "inbox" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">Inbox</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {pendingInboxCount > 0 && (
                      <button className="inbox-apply" onClick={inboxApplyAll} style={{ fontSize: 9, padding: "3px 8px" }}>
                        ✓ Apply All ({pendingInboxCount})
                      </button>
                    )}
                    {pendingInboxCount > 0 && <span className="pbadge">{pendingInboxCount} new</span>}
                  </div>
                </div>
                <div className="pb">
                  {waStatus.status !== "ready" ? (
                    <div className="hempty">
                      Connect WhatsApp first to start<br />
                      receiving HR emails from group chats.
                    </div>
                  ) : waInbox.length === 0 ? (
                    <div className="hempty">
                      No emails extracted yet.<br />
                      Watching {waStatus.watchedGroups?.length || 0} group{waStatus.watchedGroups?.length !== 1 ? "s" : ""}. New HR emails will appear here.
                    </div>
                  ) : (
                    <div className="hlist">
                      {waInbox.filter(x => x.status === "pending").map(item => (
                        <div key={item.id} className="inbox-item" style={{ cursor: "pointer" }} onClick={e => { e.preventDefault(); e.stopPropagation(); setInboxPreview(item); }}>
                          <div className="hi-row">
                            <div className="hi-co">{item.company || item.jobTitle || item.email}</div>
                            <div className="hi-time">{fmtRelTime(item.ts)}</div>
                          </div>
                          <div className="hi-email" style={{ pointerEvents: "none" }}>{item.email}</div>
                          {item.jobTitle && <div className="hi-sub">{item.jobTitle}</div>}
                          <div className="inbox-snip">{item.snippet}</div>
                          <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "var(--t4)" }}>
                            from: {item.groupName}
                          </div>
                          <div className="inbox-acts" onClick={e => e.stopPropagation()}>
                            <button className="inbox-apply" onClick={e => { e.stopPropagation(); inboxApply(item); }}>✓ Apply</button>
                            <button className="inbox-dismiss" onClick={e => { e.stopPropagation(); inboxDismiss(item.id); }}>✗ Skip</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                          await fetch(`${API_BASE}/upload/${a.filename}`, { method: "DELETE" });
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
                      {r.status === "done" && (
                        <button className="sb-btn sbsend" onClick={() => sendOne(r)}>
                          ⚡ Send Now
                        </button>
                      )}
                      {r.status === "sent" && <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--green)" }}>✓ Delivered</span>}
                    </div>
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
                  <div className="plbl">{validCount} recipient{validCount !== 1 ? "s" : ""} queued · will auto-send</div>
                  <div className="ptrk"><div className="pfil" style={{ width: `${validCount > 0 ? 10 : 0}%` }} /></div>
                </div>
              )}
              {doneCount > 0 && !running && (
                <button className="rbtn" onClick={() => setRecipients(p => p.map(r => ({ ...r, status: "idle", statusMsg: "", subject: "", body: "" })))}>Reset</button>
              )}
              <button className="lbtn" disabled={running || !validCount} onClick={runAgent}>
                {running ? <><span className="spin">⚙</span>Running...</> : <>🚀 Generate & Send</>}
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
              {previewRec.status !== "sent" && (
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

      {inboxPreview && (
        <div className="mbg" onClick={e => { if (e.target.className === "mbg") setInboxPreview(null) }}>
          <div className="modal">
            <div className="mhd">
              <div className="mico">📨</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mto">
                  HR Email: <span>{inboxPreview.email}</span>
                </div>
                <div className="msub">{inboxPreview.jobTitle || "Open Position"}</div>
              </div>
              <button className="mcls" onClick={() => setInboxPreview(null)}>×</button>
            </div>
            <div className="mbdy" style={{ padding: 0 }}>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                {inboxPreview.company && (
                  <div>
                    <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Company</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{inboxPreview.company}</div>
                  </div>
                )}
                {inboxPreview.jobTitle && (
                  <div>
                    <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Role</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{inboxPreview.jobTitle}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Contact Email</div>
                  <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--blue)" }}>{inboxPreview.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Source</div>
                  <div style={{ fontSize: 12, color: "var(--t2)" }}>
                    {inboxPreview.groupName} · {new Date(inboxPreview.ts).toLocaleString()}
                    {inboxPreview.sender && <span style={{ color: "var(--t4)" }}> · by {inboxPreview.sender}</span>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Original Message</div>
                  <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t2)", lineHeight: 1.7, whiteSpace: "pre-wrap", background: "var(--bg)", padding: 12, borderRadius: 8, border: "1px solid var(--b1)", maxHeight: 240, overflowY: "auto" }}>
                    {inboxPreview.snippet}
                  </div>
                </div>
              </div>
            </div>
            <div className="mftr">
              <button className="sb-btn sbsend" onClick={() => { inboxApply(inboxPreview); setInboxPreview(null); }}>✓ Apply</button>
              <button className="sb-btn sbcopy" onClick={() => { inboxDismiss(inboxPreview.id); setInboxPreview(null); }}>✗ Skip</button>
              <button className="sb-btn sbcopy" onClick={() => {
                navigator.clipboard.writeText(`Email: ${inboxPreview.email}\nRole: ${inboxPreview.jobTitle}\nCompany: ${inboxPreview.company}\n\n${inboxPreview.snippet}`);
                showToast("Copied to clipboard", "ok");
              }}>📋 Copy</button>
            </div>
          </div>
        </div>
      )}

      {historyPreview && (
        <div className="mbg" onClick={e => { if (e.target.className === "mbg") setHistoryPreview(null) }}>
          <div className="modal">
            <div className="mhd">
              <div className="mico">{historyPreview.status === "sent" ? "✉️" : "⚠️"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mto">
                  To: <span>{historyPreview.email}</span>
                  {historyPreview.company && <> · <span>{historyPreview.company}</span></>}
                  {historyPreview.jobTitle && <> · <span>{historyPreview.jobTitle}</span></>}
                </div>
                <div className="msub">{historyPreview.subject}</div>
                <div className="mto" style={{ marginTop: 4 }}>
                  {new Date(historyPreview.sentAt).toLocaleString()} ·{" "}
                  <span style={{ color: historyPreview.status === "sent" ? "var(--green)" : "var(--red)" }}>
                    {historyPreview.status === "sent" ? "✓ Delivered" : `✗ ${historyPreview.error || "Failed"}`}
                  </span>
                </div>
              </div>
              <button className="mcls" onClick={() => setHistoryPreview(null)}>×</button>
            </div>
            <div className="mbdy">{historyPreview.body}</div>
            <div className="mftr">
              {historyPreview.attachments?.length > 0 && (
                <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap", fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)" }}>
                  📎 {historyPreview.attachments.map(a => a.name).join(", ")}
                </div>
              )}
              <button className="sb-btn sbcopy" onClick={() => {
                navigator.clipboard.writeText(`Subject: ${historyPreview.subject}\n\n${historyPreview.body}`);
                showToast("Copied to clipboard", "ok");
              }}>📋 Copy</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.type === "ok" ? "✓" : toast.type === "err" ? "✗" : "ℹ"} {toast.msg}</div>}
    </>
  );
}
