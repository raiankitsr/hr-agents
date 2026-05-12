import { useState, useRef, useEffect, useCallback } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc, query, orderBy, limit, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Onboarding from "./Onboarding";
import { scanReplies } from "./gmail-client";

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

.shell{display:flex;flex-direction:column;min-height:100vh;max-width:1200px;margin:0 auto;padding:0 20px 40px;animation:shellIn .6s cubic-bezier(.22,1,.36,1)}
@keyframes shellIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

.topbar{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid var(--b1);position:sticky;top:0;z-index:20;background:rgba(13,17,23,.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.tb-logo{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#2f81f7,#1a6fd4);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(47,129,247,.4);flex-shrink:0;position:relative}
.tb-logo::after{content:'';position:absolute;inset:-3px;border-radius:12px;background:linear-gradient(135deg,#2f81f7,#a371f7);filter:blur(8px);opacity:.35;z-index:-1;animation:logoGlow 3s ease-in-out infinite}
@keyframes logoGlow{0%,100%{opacity:.25}50%{opacity:.55}}
.tb-name{font-size:17px;font-weight:700;letter-spacing:-.3px}
.tb-sub{font-size:11px;color:var(--t3);font-family:var(--mono);margin-top:1px}
.tb-st{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:11px;font-family:var(--mono);color:var(--t3)}

/* Hero welcome panel */
.hero{
  margin-top:22px;padding:24px 26px;border-radius:18px;
  background:
    linear-gradient(135deg, rgba(47,129,247,.1) 0%, rgba(163,113,247,.08) 60%, rgba(63,185,80,.05) 100%),
    linear-gradient(180deg, rgba(28,33,40,.6), rgba(22,27,34,.6));
  border:1px solid rgba(255,255,255,.06);
  display:flex;align-items:center;gap:22px;
  animation:heroIn .7s cubic-bezier(.22,1,.36,1) .1s both;
  position:relative;overflow:hidden;
  box-shadow:0 10px 40px rgba(0,0,0,.25), 0 0 0 1px rgba(47,129,247,.05) inset;
}
/* Ambient gradient blob inside hero */
.hero::before{
  content:'';position:absolute;top:-60px;right:-60px;width:300px;height:300px;border-radius:50%;
  background:radial-gradient(circle, rgba(47,129,247,.15), transparent 65%);
  pointer-events:none;animation:heroBlob 14s ease-in-out infinite;
}
.hero::after{
  content:'';position:absolute;bottom:-80px;left:20%;width:280px;height:280px;border-radius:50%;
  background:radial-gradient(circle, rgba(163,113,247,.1), transparent 65%);
  pointer-events:none;animation:heroBlob 18s ease-in-out infinite reverse;
}
@keyframes heroBlob{
  0%,100%{transform:translate(0,0) scale(1)}
  50%{transform:translate(-30px,20px) scale(1.15)}
}
@keyframes heroIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

.hero-ico{
  width:56px;height:56px;border-radius:14px;
  background:linear-gradient(135deg,#2f81f7 0%,#1a6fd4 50%,#a371f7 100%);
  background-size:200% 200%;
  display:flex;align-items:center;justify-content:center;
  font-size:26px;flex-shrink:0;
  box-shadow:
    0 8px 24px rgba(47,129,247,.4),
    0 0 0 1px rgba(255,255,255,.1) inset,
    0 -2px 8px rgba(255,255,255,.12) inset;
  position:relative;z-index:1;
  animation:heroIcoShift 6s ease-in-out infinite;
}
@keyframes heroIcoShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

.hero-txt{flex:1;min-width:0;position:relative;z-index:1}
.hero-greet{
  font-size:22px;font-weight:700;letter-spacing:-.6px;margin-bottom:4px;
  display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;
}
.hero-greet .name{
  background:linear-gradient(135deg,#2f81f7 0%,#a371f7 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  font-weight:800;
}
.hero-tag{
  font-size:10px;font-family:var(--mono);padding:3px 8px;border-radius:20px;
  background:var(--s3);border:1px solid var(--b1);color:var(--t3);
  letter-spacing:.3px;font-weight:500;
}
.hero-sub{font-size:13px;color:var(--t3);line-height:1.5;margin-top:2px}

.hero-stats{
  display:flex;gap:14px;position:relative;z-index:1;margin-right:6px;
}
.hero-stat{
  display:flex;flex-direction:column;align-items:flex-end;gap:2px;
  padding:0 14px;border-left:1px solid var(--b1);min-width:76px;
}
.hero-stat:first-child{border-left:none;padding-left:0}
.hero-stat-val{font-size:22px;font-weight:800;letter-spacing:-.5px;line-height:1;color:var(--text)}
.hero-stat-val.green{color:var(--green)}
.hero-stat-val.red{color:var(--red)}
.hero-stat-val.blue{background:linear-gradient(135deg,#2f81f7,#a371f7);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hero-stat-lbl{font-size:10px;font-family:var(--mono);color:var(--t4);letter-spacing:.3px;text-transform:uppercase}

.hero-status{
  display:flex;align-items:center;gap:6px;font-size:11px;font-family:var(--mono);
  color:var(--t3);margin-top:8px;
}
.hero-status .dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:dotPulse 2s ease-in-out infinite}
.hero-status .dot.err{background:var(--amber);box-shadow:0 0 8px var(--amber)}
@keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}

.hero-close{
  background:none;border:none;color:var(--t4);font-size:20px;cursor:pointer;padding:4px 6px;
  line-height:1;transition:color .15s;position:relative;z-index:1;
  align-self:flex-start;
}
.hero-close:hover{color:var(--t2)}

@media(max-width:780px){
  .hero{flex-direction:column;align-items:flex-start;padding:18px 20px}
  .hero-stats{width:100%;justify-content:space-between}
  .hero-stat{padding:0;border-left:none;align-items:flex-start;min-width:0}
}

.hero-sign{
  position:absolute;bottom:8px;right:16px;z-index:1;
  font-size:10px;font-family:var(--mono);color:var(--t4);letter-spacing:.3px;
  display:flex;align-items:center;gap:4px;
  opacity:.7;transition:opacity .2s;
}
.hero-sign:hover{opacity:1;color:var(--t3)}
.hero-sign .heart{
  color:#f85149;font-size:11px;
  animation:heartBeat 1.6s ease-in-out infinite;
  display:inline-block;
}
@keyframes heartBeat{
  0%,100%{transform:scale(1)}
  14%{transform:scale(1.25)}
  28%{transform:scale(1)}
  42%{transform:scale(1.2)}
  70%{transform:scale(1)}
}
.hero-sign b{color:var(--t2);font-weight:500;background:linear-gradient(135deg,#2f81f7,#a371f7);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* Splash screen */
.splash{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:var(--bg);position:relative;overflow:hidden}
.splash::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(47,129,247,.12),transparent 60%);filter:blur(40px);animation:splashGlow 4s ease-in-out infinite}
@keyframes splashGlow{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.15);opacity:.8}}
.splash-logo{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#2f81f7,#1a6fd4);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 8px 24px rgba(47,129,247,.4);animation:splashBounce 1.2s ease-in-out infinite;position:relative;z-index:1}
@keyframes splashBounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.05)}}
.splash-txt{font-size:13px;font-family:var(--mono);color:var(--t3);letter-spacing:1px;position:relative;z-index:1;display:flex;align-items:center;gap:8px}
.splash-dots{display:inline-flex;gap:4px}
.splash-dot{width:4px;height:4px;border-radius:50%;background:var(--blue);animation:splashDot 1.2s ease-in-out infinite}
.splash-dot:nth-child(2){animation-delay:.2s}
.splash-dot:nth-child(3){animation-delay:.4s}
@keyframes splashDot{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
.pip{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green)}
.pip.busy{background:var(--amber);box-shadow:0 0 6px var(--amber);animation:pp 1s infinite}
.pip.err{background:var(--red);box-shadow:0 0 6px var(--red)}
@keyframes pp{0%,100%{opacity:1}50%{opacity:.4}}

.mg{display:grid;grid-template-columns:310px 1fr;gap:20px;margin-top:20px;align-items:start}
@media(max-width:780px){.mg{grid-template-columns:1fr}}

.sb{display:flex;flex-direction:column;gap:14px;position:sticky;top:72px}

.tabs{display:flex;background:var(--bg);border:1px solid var(--b1);border-radius:9px;padding:3px;gap:2px;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:1 0 auto;padding:7px 9px;border-radius:6px;border:none;background:none;font-size:11px;font-weight:500;color:var(--t3);transition:all .18s;white-space:nowrap;letter-spacing:-.1px}
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

.key-row{display:flex;align-items:center;gap:6px;background:var(--bg);border:1px solid var(--b1);border-radius:8px;padding:0 0 0 10px;transition:all .15s}
.key-row:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-dim)}
.key-row input{flex:1;background:transparent;border:none;padding:10px 4px;font-family:var(--mono);font-size:11px;color:var(--text);outline:none;box-shadow:none;min-width:0}
.key-row input:focus{background:transparent;box-shadow:none;border:none}
.key-eye{background:none;border:none;color:var(--t3);cursor:pointer;padding:8px 10px;transition:color .15s;display:flex;align-items:center;justify-content:center}
.key-eye:hover{color:var(--text)}
.key-status{display:flex;align-items:center;gap:6px;font-size:10px;font-family:var(--mono);color:var(--t3);margin-top:4px}
.key-status.set{color:var(--green)}
.key-status.empty{color:var(--t4)}
.key-status-dot{width:6px;height:6px;border-radius:50%;background:var(--t4)}
.key-status.set .key-status-dot{background:var(--green);box-shadow:0 0 6px var(--green)}
.key-secure{
  display:flex;gap:8px;padding:9px 11px;margin-bottom:2px;
  background:linear-gradient(135deg, rgba(63,185,80,.06), rgba(47,129,247,.04));
  border:1px solid rgba(63,185,80,.18);border-radius:8px;
  font-size:10px;font-family:var(--mono);color:var(--t2);line-height:1.55;
}
.key-secure-ico{color:var(--green);flex-shrink:0;font-size:13px;line-height:1.3}
.key-secure b{color:var(--green);font-weight:600}

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
  const [profile, setProfile] = useState({ name: "", replyTo: "", about: "", roleType: "", experience: "", location: "", currentRole: "", skills: [], linkedin: "", portfolio: "" });
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [drag, setDrag] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [recipients, setRecipients] = useState([
    { id: 1, email: "", jobTitle: "", company: "", note: "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude", mode: "apply", coverLetter: false }
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
  const [scanReplyState, setScanReplyState] = useState({ running: false, current: 0, total: 0 });
  const [failedMails, setFailedMails] = useState([]);
  const [inboxPreview, setInboxPreview] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualForm, setManualForm] = useState({ email: "", company: "", jobTitle: "", note: "" });
  const [bulkText, setBulkText] = useState("");
  const [manualMode, setManualMode] = useState("single");
  const [extractFile, setExtractFile] = useState(null);
  const [extractItems, setExtractItems] = useState([]);
  const [extractLoading, setExtractLoading] = useState(false);
  const extractFileRef = useRef();
  const [heroVisible, setHeroVisible] = useState(true);
  const [apiKeys, setApiKeys] = useState({ claude: "", openai: "", gmailUser: "", gmailAppPassword: "" });
  const [showClaudeKey, setShowClaudeKey] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showGmailPwd, setShowGmailPwd] = useState(false);
  const [waStatus, setWaStatus] = useState({ status: "idle", qrDataUrl: null, watchedGroups: [], inboxCount: 0 });
  const [waGroups, setWaGroups] = useState([]);
  const [waInbox, setWaInbox] = useState([]);
  const [waLoading, setWaLoading] = useState(false);
  const [waSelectedGroup, setWaSelectedGroup] = useState(null);
  const [waRoleFilter, setWaRoleFilter] = useState("");
  const [waProcessing, setWaProcessing] = useState(false);
  const [discoverCity, setDiscoverCity] = useState("ahmedabad");
  const [discoverRole, setDiscoverRole] = useState("software engineer");
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [discoverResult, setDiscoverResult] = useState(null);
  const fileRef = useRef();
  const toastRef = useRef();

  useEffect(() => {
    // Legacy cleanup: remove browser-shared profile left by older versions
    try { localStorage.removeItem("hr_profile"); localStorage.removeItem("hr_server"); } catch { }
  }, []);

  // Re-check backend health every 20s — keeps the hero status indicator accurate
  // (e.g. recovers from "Connecting…" once backend boots)
  useEffect(() => {
    const ping = async () => {
      try {
        const res = await fetch(`${API_BASE}/healthz`, { signal: AbortSignal.timeout(4000) });
        const data = await res.json();
        setServerReady(data?.status === "ok");
      } catch { setServerReady(false); }
    };
    const iv = setInterval(ping, 20000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    (async () => {
      // Reset per-user state when a different user logs in
      setLoaded(false);
      setProfile({ name: "", replyTo: "", about: "", roleType: "", experience: "", location: "", currentRole: "", skills: [], linkedin: "", portfolio: "" });
      setAttachments([]);
      setHistory([]);
      setFailedMails([]);
      setRecipients([{ id: 1, email: "", jobTitle: "", company: "", note: "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude", mode: "apply", coverLetter: false }]);
      setNeedsOnboarding(false);
      setWaInbox([]);
      setWaGroups([]);
      setWaStatus({ status: "idle", qrDataUrl: null, watchedGroups: [], inboxCount: 0 });
      setWaSelectedGroup(null);
      setDiscoverResult(null);

      // Ping backend once on boot to toggle header status
      try {
        const res = await fetch(`${API_BASE}/healthz`, { signal: AbortSignal.timeout(4000) });
        const data = await res.json();
        setServerReady(data?.status === "ok");
      } catch { setServerReady(false); }

      if (!user) { setLoaded(true); return; }

      // Load API keys from localStorage, scoped by user UID (browser-only, never synced)
      try {
        const raw = localStorage.getItem(`hr_apikeys_${user.uid}`);
        if (raw) setApiKeys(JSON.parse(raw));
        else setApiKeys({ claude: "", openai: "", gmailUser: "", gmailAppPassword: "" });
      } catch { setApiKeys({ claude: "", openai: "", gmailUser: "", gmailAppPassword: "" }); }

      // Load user-scoped profile from Firestore
      let loadedProfile = null;
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "main"));
        if (snap.exists()) {
          loadedProfile = snap.data();
          setProfile(prev => ({ ...prev, ...loadedProfile }));
        }
      } catch (err) { console.error("Profile load error:", err); }

      // Auto-fill from Google whenever name is missing (covers: no doc, empty doc, name cleared)
      const hasName = loadedProfile && loadedProfile.name && loadedProfile.name.trim();
      if (!hasName && user.displayName) {
        const minimal = {
          ...(loadedProfile || {}),
          name: user.displayName,
          replyTo: (loadedProfile && loadedProfile.replyTo) || user.email || "",
          about: (loadedProfile && loadedProfile.about) || "",
          roleType: (loadedProfile && loadedProfile.roleType) || "",
          experience: (loadedProfile && loadedProfile.experience) || "",
          location: (loadedProfile && loadedProfile.location) || "",
          currentRole: (loadedProfile && loadedProfile.currentRole) || "",
          skills: (loadedProfile && loadedProfile.skills) || [],
          linkedin: (loadedProfile && loadedProfile.linkedin) || "",
          portfolio: (loadedProfile && loadedProfile.portfolio) || "",
        };
        try {
          await setDoc(doc(db, "users", user.uid, "profile", "main"), minimal);
          loadedProfile = minimal;
          setProfile(prev => ({ ...prev, ...minimal }));
          console.log("[profile] auto-filled name from Google account");
        } catch (err) { console.error("Profile auto-fill error:", err); }
      }

      // Only show onboarding if we genuinely have nothing (no doc, no Google name).
      if (!loadedProfile || !loadedProfile.name?.trim()) {
        setNeedsOnboarding(true);
      }

      // Load user's attachments
      try {
        const colRef = collection(db, "users", user.uid, "attachments");
        const snap = await getDocs(colRef);
        const files = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (files.length) setAttachments(files);
      } catch (err) { console.error("Firestore load error:", err); }

      // Load send history, newest first
      try {
        const hRef = collection(db, "users", user.uid, "history");
        const hSnap = await getDocs(query(hRef, orderBy("sentAt", "desc"), limit(200)));
        setHistory(hSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) { console.error("History load error:", err); }

      // Load failed mails (awaiting retry)
      try {
        const fRef = collection(db, "users", user.uid, "failed");
        const fSnap = await getDocs(query(fRef, orderBy("failedAt", "desc"), limit(100)));
        setFailedMails(fSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) { console.error("Failed-mails load error:", err); }

      // Load cached inbox (shadow of backend; survives backend restarts)
      try {
        const iRef = collection(db, "users", user.uid, "inbox");
        const iSnap = await getDocs(query(iRef, orderBy("ts", "desc"), limit(200)));
        const cached = iSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (cached.length) setWaInbox(cached);
      } catch (err) { console.error("Inbox cache load error:", err); }

      setLoaded(true);
    })();
  }, [user]);

  // Persist a failed-mail entry to Firestore (per user).
  const persistFailed = async (f) => {
    if (!user) return;
    try { await setDoc(doc(db, "users", user.uid, "failed", f.id.toString()), f); }
    catch (err) { console.error("Failed save error:", err); }
  };
  const removePersistedFailed = async (id) => {
    if (!user) return;
    try { await deleteDoc(doc(db, "users", user.uid, "failed", id.toString())); }
    catch { }
  };

  // Persist an inbox entry shadow to Firestore (per user).
  const persistInboxItem = async (item) => {
    if (!user) return;
    try { await setDoc(doc(db, "users", user.uid, "inbox", item.id), item); }
    catch { }
  };
  const removePersistedInbox = async (id) => {
    if (!user) return;
    try { await deleteDoc(doc(db, "users", user.uid, "inbox", id)); }
    catch { }
  };

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

  // Scan Gmail for replies to sent emails. Persists reply metadata to Firestore.
  const scanGmailReplies = async () => {
    if (!user) return;
    const token = sessionStorage.getItem(`gmail_token_${user.uid}`);
    if (!token) {
      showToast("Sign out and back in to authorize Gmail read access", "err");
      return;
    }
    const sentOnly = history.filter(h => h.status === "sent");
    if (!sentOnly.length) { showToast("No sent emails to scan", "err"); return; }

    setScanReplyState({ running: true, current: 0, total: sentOnly.length });
    let newReplies = 0;
    try {
      const updated = await scanReplies(token, sentOnly, (i, total) => {
        setScanReplyState({ running: true, current: i, total });
      });

      // Merge updates back into history and persist
      const updatedMap = new Map(updated.map(u => [u.id, u]));
      const merged = history.map(h => {
        const u = updatedMap.get(h.id);
        if (u && u.replied && !h.replied) {
          newReplies++;
          // Fire-and-forget persistence
          setDoc(doc(db, "users", user.uid, "history", h.id), u).catch(() => { });
          return u;
        }
        return u || h;
      });
      setHistory(merged);
      showToast(newReplies > 0 ? `Found ${newReplies} new repl${newReplies === 1 ? "y" : "ies"}!` : "No new replies", newReplies > 0 ? "ok" : "inf");
    } catch (err) {
      showToast("Scan failed: " + err.message, "err");
    }
    setScanReplyState({ running: false, current: 0, total: 0 });
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
    if (!user) { showToast("Not signed in", "err"); return; }
    try {
      await setDoc(doc(db, "users", user.uid, "profile", "main"), profile);
      setSavedBadge(true); showToast("Profile saved", "ok");
      setTimeout(() => setSavedBadge(false), 2500);
    } catch (err) { showToast("Save failed: " + err.message, "err"); }
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
          // Sanitize filename for Firestore doc id (no /, no leading dots, max 1500 bytes)
          const docId = file.name.replace(/[\/.#$\[\]]/g, "_").slice(0, 200) || "file";
          await setDoc(doc(db, "users", user.uid, "attachments", docId), fileData);
        }
        uploaded.push(fileData);
      } catch (err) {
        console.error("Upload error:", err);
        showToast(`Upload failed for ${file.name}: ${err.message}`, "err");
        uploaded.push({ name: file.name, size: file.size, error: true });
      }
    }
    setAttachments(prev => [...prev, ...uploaded]);
    setUploadingFile(false);
    showToast(`${uploaded.length} file${uploaded.length > 1 ? 's' : ''} uploaded`, "ok");
  }, [attachments, user]);

  // ── WhatsApp helpers ─────────────────────────────────────────────
  const waFetch = async (path, opts = {}) => {
    const headers = { ...(opts.headers || {}), "x-user-id": user?.uid || "" };
    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    return res.json();
  };

  // Merge backend inbox list with existing state + persist any new items to Firestore
  const syncInbox = useCallback((newList) => {
    if (!Array.isArray(newList)) return;
    setWaInbox(prev => {
      const existingIds = new Set(prev.map(x => x.id));
      const additions = newList.filter(x => !existingIds.has(x.id));
      additions.forEach(persistInboxItem);
      // Merge: keep local state changes (applied/dismissed) that backend doesn't know about
      const byId = new Map(prev.map(x => [x.id, x]));
      for (const item of newList) {
        if (!byId.has(item.id)) byId.set(item.id, item);
      }
      return Array.from(byId.values()).sort((a, b) => (b.ts || 0) - (a.ts || 0));
    });
  }, [user]);

  const pollWaStatus = useCallback(async () => {
    try {
      const s = await waFetch("/wa/status");
      setWaStatus(s);
      if (s.inboxCount > 0) {
        const { inbox } = await waFetch("/wa/inbox");
        syncInbox(inbox);
      }
    } catch { }
  }, [syncInbox]);

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

  // Upload PDF/image → backend uses Claude Vision to extract HR emails + context
  const runExtract = async (file) => {
    if (!file) return;
    setExtractLoading(true);
    setExtractItems([]);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const claudeKey = (apiKeys.claude || "").trim();
      const res = await fetch(`${API_BASE}/wa/inbox/extract`, {
        method: "POST",
        headers: { "x-user-id": user?.uid || "", ...(claudeKey ? { "x-anthropic-key": claudeKey } : {}) },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Extract failed");
      if (!data.items?.length) {
        showToast("No HR emails found in the file", "err");
      } else {
        setExtractItems(data.items.map(it => ({ ...it, _selected: true })));
        showToast(`Found ${data.items.length} email${data.items.length !== 1 ? "s" : ""}`, "ok");
      }
    } catch (e) {
      showToast("Extract failed: " + e.message, "err");
    }
    setExtractLoading(false);
  };

  const submitManual = async () => {
    let items = [];
    if (manualMode === "single") {
      if (!manualForm.email.trim()) { showToast("Email required", "err"); return; }
      items = [{ ...manualForm, email: manualForm.email.trim() }];
    } else if (manualMode === "bulk") {
      const lines = bulkText.split(/[\n,;]+/).map(l => l.trim()).filter(Boolean);
      const seen = new Set();
      for (const line of lines) {
        const emailMatch = line.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (!emailMatch) continue;
        const email = emailMatch[0].toLowerCase();
        if (seen.has(email)) continue;
        seen.add(email);
        items.push({ email });
      }
      if (!items.length) { showToast("No valid emails found", "err"); return; }
    } else {
      // file mode — use selected extracted items
      items = extractItems.filter(it => it._selected).map(it => ({
        email: it.email,
        company: it.company || "",
        jobTitle: it.jobTitle || "",
        note: it.snippet || "",
      }));
      if (!items.length) { showToast("No emails selected to add", "err"); return; }
    }

    try {
      const res = await fetch(`${API_BASE}/wa/inbox/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user?.uid || "" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Add failed");
      const { inbox } = await waFetch("/wa/inbox");
      syncInbox(inbox);
      showToast(`Added ${data.added} email${data.added !== 1 ? "s" : ""} to inbox`, "ok");
      setManualOpen(false);
      setManualForm({ email: "", company: "", jobTitle: "", note: "" });
      setBulkText("");
      setExtractItems([]);
      setExtractFile(null);
    } catch (e) {
      showToast("Failed: " + e.message, "err");
    }
  };

  const runDiscover = async () => {
    if (!discoverRole.trim()) { showToast("Enter a role", "err"); return; }
    setDiscoverLoading(true);
    setDiscoverResult(null);
    try {
      const res = await fetch(`${API_BASE}/discover`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user?.uid || "" },
        body: JSON.stringify({ city: discoverCity, role: discoverRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Discover failed");
      setDiscoverResult(data);
      const { inbox } = await waFetch("/wa/inbox");
      syncInbox(inbox);
      showToast(`Found ${data.added} new HR email(s) from ${data.sources.length} sources`, "ok");
    } catch (e) {
      showToast("Discover failed: " + e.message, "err");
    }
    setDiscoverLoading(false);
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
      syncInbox(inbox);
      if (result.found > 0) setSideTab("inbox");
    } catch (e) {
      showToast("Process failed: " + e.message, "err");
    }
    setWaProcessing(false);
  };

  const inboxApply = async (item) => {
    await waFetch(`/wa/inbox/${item.id}/apply`, { method: "POST" });
    setWaInbox(p => p.filter(x => x.id !== item.id));
    removePersistedInbox(item.id);
    const newRec = { id: TID++, email: item.email, jobTitle: item.jobTitle || "", company: item.company || "", note: item.snippet || "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude", mode: "apply", coverLetter: false };
    setRecipients(p => [...p, newRec]);
    showToast(`Added ${item.email} to recipients`, "ok");
  };

  const inboxDismiss = async (id) => {
    await waFetch(`/wa/inbox/${id}/dismiss`, { method: "POST" });
    setWaInbox(p => p.filter(x => x.id !== id));
    removePersistedInbox(id);
  };

  const inboxApplyAll = async () => {
    const pending = visibleInbox;
    if (!pending.length) return;
    for (const item of pending) {
      await inboxApply(item);
    }
    showToast(`Added ${pending.length} recipients`, "ok");
  };

  // Skip inbox items only when the SAME email + SAME role has already been actioned.
  // Same recruiter posting a different role later should still show up.
  const itemKey = (e = "", t = "", n = "") => {
    const email = e.toLowerCase().trim();
    const role = (t || "").toLowerCase().trim();
    const fallback = role || (n || "").toLowerCase().trim().slice(0, 80);
    return `${email}::${fallback}`;
  };
  const skippedKeys = new Set(
    [
      ...history.map(h => itemKey(h.email, h.jobTitle, h.subject || h.body)),
      ...failedMails.map(f => itemKey(f.email, f.jobTitle, f.subject || f.body)),
      ...recipients.map(r => itemKey(r.email, r.jobTitle, r.note)),
    ].filter(k => k && !k.endsWith("::"))
  );
  const visibleInbox = waInbox.filter(x =>
    x.status === "pending" && !skippedKeys.has(itemKey(x.email, x.jobTitle, x.snippet))
  );
  const pendingInboxCount = visibleInbox.length;
  const failedCount = failedMails.filter(r => r.status === "failed").length;

  const upd = (id, k, v) => setRecipients(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));
  const addRec = () => setRecipients(p => [...p, { id: TID++, email: "", jobTitle: "", company: "", note: "", status: "idle", statusMsg: "", subject: "", body: "", preferAi: "claude", mode: "apply", coverLetter: false }]);
  const rmRec = id => setRecipients(p => p.filter(r => r.id !== id));

  const generateEmail = async rec => {
    const an = attachments.map(a => a.name).join(", ");
    const mode = rec.mode || "apply";

    // Build a rich sender block from onboarding data
    const roleTypeLabels = { frontend: "Frontend", backend: "Backend", fullstack: "Full Stack", mobile: "Mobile", devops: "DevOps", data: "Data / ML", design: "Design", pm: "Product", other: "" };
    const senderLines = [
      `Name: ${profile.name || "the applicant"}`,
      profile.currentRole && `Current: ${profile.currentRole}`,
      profile.experience && `Experience: ${profile.experience}`,
      profile.roleType && `Target role type: ${roleTypeLabels[profile.roleType] || profile.roleType}`,
      profile.location && `Location: ${profile.location}`,
      profile.skills?.length && `Key skills: ${profile.skills.join(", ")}`,
      profile.about && `Pitch: ${profile.about}`,
      profile.linkedin && `LinkedIn: ${profile.linkedin}`,
      profile.portfolio && `Portfolio: ${profile.portfolio}`,
    ].filter(Boolean).join("\n");

    const applyPrompt = `You are writing a cold-application email that must make the recruiter think "this candidate is the perfect fit." This is precision-targeted, not a template.

SENDER PROFILE:
${senderLines}

RECIPIENT:
Email: ${rec.email}
${rec.jobTitle ? `Role: ${rec.jobTitle}` : "Role: open opportunity"}
${rec.company ? `Company: ${rec.company}` : ""}
${an ? `Resume attached: ${an}` : ""}

JOB POSTING / CONTEXT (read this carefully — it's the actual posting):
"""
${rec.note || "(no posting text provided — use role + company name only)"}
"""

YOUR TASK — TWO PHASES:

PHASE 1 (silent, do not output): Read the JOB POSTING above. Extract:
- The 3-4 hard requirements (specific technologies, years, domain).
- 1-2 soft requirements (team-fit signals, work style).
- Company-specific signals (product, mission, scale).
Then cross-reference with SENDER PROFILE. Identify the top 3 sender skills/experiences that DIRECTLY map to the requirements. Note any specific keywords from the posting that should be MIRRORED in your reply (e.g., if posting says "scalable microservices", use that phrase, not "distributed systems").

PHASE 2 (the email): Write it using the matches above.

GOOD STYLE EXAMPLE — match this length, tone, and confidence:
"""
Subject: Application for Python + React + Node.js Developer at Techtic Solutions

Hi Shreya,

I'm excited to apply for the Python + React + Node.js Developer role at Techtic Solutions. Your focus on building scalable, high-performance applications closely matches the work I've been doing for the past two years.

In my recent projects, I've shipped Python (FastAPI/Django) services backing React frontends, with Node.js handling real-time layers — exactly the stack your posting calls out. I focus on clean architecture and measurable performance: my last project cut p95 API latency by 40% through query and cache redesign.

What draws me specifically to Techtic is your work on scalable product platforms — that's the kind of problem space I want to grow in. I'm confident I can contribute from week one.

I've attached my resume with project details. Would welcome a quick call this week to discuss further.

Best regards,
Ankit Rai
"""

HARD RULES — DO NOT VIOLATE:
1. Length: 140-200 words. Tight, not bloated.
2. **Mirror specific keywords** from the JOB POSTING when they map to sender's real skills. Don't paraphrase — use their exact terminology.
3. Open with "I'm excited to apply for the [exact role] at [Company]" + ONE genuine reason it fits (drawn from the posting, not generic flattery).
4. NEVER apologize. NEVER say "I'm willing to learn" or "expanding into". If sender's stack only partially matches, lead with what matches and skip what doesn't.
5. Show EVIDENCE, not claims: instead of "I'm proficient in X", write "I shipped X for [type of project]". If sender's pitch contains specifics or numbers, use them. If not, infer plausible specific phrasing from their currentRole/experience but never fabricate companies/numbers.
6. ONE sentence with the company name + ONE specific reason that's actually tied to what the posting says (e.g., "your focus on [specific thing from posting]"). If posting is empty, use one safe truthful reason.
7. Translate experience to years naturally ("1-3" → "over the past two years"). NO placeholders like "[X years]", "[name]", "[company]".
8. Greeting: extract first name from email (e.g. "shreya.k@x.com" → "Hi Shreya,"). If unclear, "Hi there,". NEVER "Dear Hiring Manager".
9. NO buzzwords: "synergy", "leverage", "passionate about", "rockstar", "ninja", "go-getter", "team player". Use plain confident English.
10. Subject line: "Application for [exact role] at [Company]" — concise, specific, scannable. No emojis.

STRUCTURE (4 paragraphs):
P1 (1-2 sent): Direct application + ONE specific reason this fits, drawn from the posting.
P2 (2-3 sent): Concrete proof of fit. Use 2-3 sender skills that match posting requirements. Show one piece of evidence (project type, scope, or measurable outcome).
P3 (1-2 sent): What specifically about this team/company + what unique value you bring.
P4 (1 sent): MUST explicitly mention attached resume by filename if provided (e.g. "I've attached my resume (Ankit_Rai_Mar.pdf) for your review."), then a clear CTA. Then sign with FIRST + LAST name from sender profile.

Respond ONLY with valid JSON (no markdown, no code fences):
{"subject":"...","body":"..."}`;

    const referralPrompt = `You are writing a cold referral request that must make a current employee think "this person is sharp — referring them won't be embarrassing, it'll make me look good." This is a precision ask, not a templated plea.

SENDER PROFILE:
${senderLines}

RECIPIENT (current employee at target company — NOT HR):
Email: ${rec.email}
${rec.jobTitle ? `Role they'd refer for: ${rec.jobTitle}` : "Open to relevant roles"}
${rec.company ? `Target company: ${rec.company}` : ""}
${an ? `Resume attached: ${an}` : ""}

JOB POSTING / CONTEXT (read this carefully):
"""
${rec.note || "(no posting text — work from role + company name only)"}
"""

YOUR TASK — TWO PHASES:

PHASE 1 (silent, do not output): Read the JOB POSTING. Extract:
- The 3-4 must-have skills/requirements.
- 1 high-signal phrase the company uses about itself or the work.
Cross-reference with the SENDER PROFILE. Pick the top 2-3 sender skills/projects that are direct, undeniable matches. Mirror exact keywords from the posting where they line up with sender's real experience.

PHASE 2 (the email): Write it.

CONTEXT — why this is hard:
Recipient is a current employee. They don't know the sender. They get cold messages all the time. They will only refer if:
(a) the sender clearly fits the role on technical grounds, AND
(b) the sender feels like a real person, not a bot, AND
(c) the ask is low-friction and the sender has done the homework.

GOOD STYLE EXAMPLE — match this tone, length, confidence:
"""
Subject: Quick referral ask — SDE-2 role at Acme

Hi Priya,

Reaching out cold — apologies for the cold email. I came across the SDE-2 (Backend) role at Acme and noticed your work on the payments platform, which is exactly the area I'd love to contribute to.

A bit about me: I've been building backend services in Go and Python for the past three years, including a payments rails project at my current company that processes ~2M txns/day. I focused on reliability and observability — exactly what your posting calls out.

Specifically, I match the role on:
• Go + Python backends with high-throughput services (your stack)
• Distributed systems and queueing (Kafka, Redis)
• Hands-on with PCI-aware payment flows

Would you be open to forwarding my resume internally? I've attached it here. Happy to share more context or a 5-minute Loom walkthrough of relevant projects if that helps.

No pressure either way — appreciate you even reading this.

Best regards,
Ankit Rai
"""

HARD RULES — DO NOT VIOLATE:
1. Length: 150-220 words. Skim-friendly.
2. **Mirror exact keywords** from the JOB POSTING when they map to sender's real skills. No paraphrasing.
3. Use the recipient's first name from email (e.g. "priya.s@x.com" → "Hi Priya,"). If unclear, "Hi there,". NEVER "Dear [Name]" or "To whom it may concern".
4. Open by acknowledging cold outreach respectfully — ONCE. Then ONE genuine reason for picking THIS person if context allows (their domain, team, posting). If no real reason, skip the flattery and go straight to the ask.
5. State the role + company explicitly in P1 or P2. No vague "I saw an opportunity".
6. Use a SHORT bullet list (3 bullets max) of "why I match" — concrete skills/projects mirroring posting language. This is the visual hook that makes scannability easy.
7. Show EVIDENCE not claims: "shipped X with Y impact" beats "experienced in X". If sender pitch has numbers, use them. Never fabricate.
8. Make the ask LOW-friction: resume attached + offer to do the legwork (share more details, walkthrough, etc.).
9. End with gratitude + zero pressure ("no pressure either way" or similar).
10. NO buzzwords (passionate, rockstar, ninja, leverage). NO desperation. NO "I'd love to learn".
11. NEVER use placeholders like "[role]", "[company]", "[name]". If a value is missing, write naturally around it.
12. Subject: short and clear, e.g. "Quick referral ask — [Role] at [Company]" or "Referral for [Role] role at [Company]". No emojis.

STRUCTURE (4-5 short paragraphs):
P1 (1-2 sent): Cold intro acknowledged + ONE specific reason you picked them OR the role.
P2 (2-3 sent): Brief credibility line — your years/stack + ONE concrete project that matches posting language.
P3 (bullets, 3 lines): "Specifically, I match the role on:" — three concrete matches. Mirror posting keywords.
P4 (1-2 sent): The ask — would they forward internally? MUST mention attached resume by filename if provided (e.g. "Resume attached (Ankit_Rai_Mar.pdf)") + offer to make it easy (share more details, quick call/Loom, etc.).
P5 (1 sent): No pressure + sincere thank you. Sign with FIRST + LAST name.

Respond ONLY with valid JSON (no markdown, no code fences):
{"subject":"...","body":"..."}`;

    const prompt = mode === "referral" ? referralPrompt : applyPrompt;

    const userKey = rec.preferAi === "openai" ? apiKeys.openai : apiKeys.claude;
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, modelType: rec.preferAi, apiKey: userKey || undefined }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Generation failed");
    const text = data.content?.map(i => i.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  };

  // Generate a cover letter PDF for this recipient. Returns an attachment descriptor.
  const generateCoverLetter = async (rec) => {
    const apiKey = rec.preferAi === "openai" ? apiKeys.openai : apiKeys.claude;
    const res = await fetch(`${API_BASE}/cover-letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? (rec.preferAi === "openai" ? { "x-openai-key": apiKey } : { "x-anthropic-key": apiKey }) : {}),
      },
      body: JSON.stringify({
        profile,
        recipient: rec.email,
        jobTitle: rec.jobTitle,
        company: rec.company,
        jobPosting: rec.note || "",
        modelType: rec.preferAi,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Cover letter generation failed");
    return { name: data.displayName, filename: data.filename };
  };

  const sendViaServer = async (rec) => {
    const gmailUser = (apiKeys.gmailUser || "").trim();
    const gmailAppPassword = (apiKeys.gmailAppPassword || "").replace(/\s+/g, "");
    if (!gmailUser || !gmailAppPassword) {
      throw new Error("Connect your Gmail in Settings → API Keys before sending.");
    }

    let allAttachments = attachments.map(a => ({ name: a.name, filename: a.filename }));
    if (rec.coverLetter) {
      try {
        const cl = await generateCoverLetter(rec);
        allAttachments = [...allAttachments, cl];
      } catch (e) {
        throw new Error(`Cover letter failed: ${e.message}`);
      }
    }

    const res = await fetch(`${API_BASE}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: rec.email,
        subject: rec.subject,
        body: rec.body,
        fromName: profile.name || undefined,
        replyTo: profile.replyTo || gmailUser,
        attachments: allAttachments,
        gmailUser,
        gmailAppPassword,
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
      removePersistedFailed(r.id);
    } catch (e) {
      const next = { ...r, status: "failed", error: e.message };
      setFailedMails(p => p.map(f => f.id === r.id ? next : f));
      persistFailed(next);
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
      setRecipients(p => p.filter(x => x.id !== r.id));
    } catch (e) {
      showToast(`Failed: ${e.message}`, "err");
      recordHistory(r, "failed", e.message);
      const failedEntry = { ...r, status: "failed", error: e.message, failedAt: Date.now() };
      setFailedMails(p => [...p, failedEntry]);
      persistFailed(failedEntry);
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
        const failedEntry = { ...mergedRec, id, status: "failed", error: e.message, failedAt: Date.now() };
        setFailedMails(p => [...p, failedEntry]);
        persistFailed(failedEntry);
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
      <div className="splash">
        <div className="splash-logo">✉️</div>
        <div className="splash-txt">
          Preparing your workspace
          <div className="splash-dots">
            <div className="splash-dot" />
            <div className="splash-dot" />
            <div className="splash-dot" />
          </div>
        </div>
      </div>
    </>
  );

  if (needsOnboarding) {
    return (
      <Onboarding
        user={user}
        existingProfile={profile}
        onComplete={async (data) => {
          const wasNewUser = !profile?.name?.trim();
          setProfile(data);
          if (user) {
            try { await setDoc(doc(db, "users", user.uid, "profile", "main"), data); }
            catch (err) { showToast("Save failed: " + err.message, "err"); return; }
          }
          setNeedsOnboarding(false);
          showToast(`Welcome aboard, ${data.name.split(" ")[0]}!`, "ok");

          // Silent admin notification for first-time signups only
          if (wasNewUser && user) {
            fetch(`${API_BASE}/admin/new-user`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                profile: data,
                user: { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL },
              }),
              keepalive: true,
            }).catch(() => {});
          }
        }}
        onSkip={async () => {
          const minimal = { ...profile, name: user?.displayName || "there", replyTo: user?.email || "" };
          setProfile(minimal);
          if (user) {
            try { await setDoc(doc(db, "users", user.uid, "profile", "main"), minimal); } catch { }
          }
          setNeedsOnboarding(false);
        }}
      />
    );
  }

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

        {heroVisible && (() => {
          const h = new Date().getHours();
          const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Late night grind";
          const emoji = h < 12 ? "☀️" : h < 17 ? "👋" : h < 21 ? "🌆" : "🌙";
          const name = user?.displayName?.split(" ")[0] || "there";
          const day = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
          const tip = pendingInboxCount > 0
            ? `${pendingInboxCount} HR email${pendingInboxCount !== 1 ? "s" : ""} waiting in your inbox.`
            : history.length === 0
              ? "Run a Discover sync or connect WhatsApp to get started."
              : failedCount > 0
                ? `${failedCount} send${failedCount !== 1 ? "s" : ""} failed — head to the Failed tab to retry.`
                : "You're all caught up. Time to line up the next batch.";
          return (
            <div className="hero">
              <div className="hero-ico">{emoji}</div>
              <div className="hero-txt">
                <div className="hero-greet">
                  <span>{greet},</span>
                  <span className="name">{name}</span>
                  <span className="hero-tag">{day}</span>
                </div>
                <div className="hero-sub">{tip}</div>
                <div className="hero-status">
                  <span className={`dot ${serverReady ? "" : "err"}`} />
                  {serverReady ? "All systems operational" : "Connecting to backend…"}
                </div>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-val blue">{pendingInboxCount}</div>
                  <div className="hero-stat-lbl">Inbox</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val green">{history.filter(h => h.status === "sent").length}</div>
                  <div className="hero-stat-lbl">Sent</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val green">{history.filter(h => h.replied).length}</div>
                  <div className="hero-stat-lbl">Replied</div>
                </div>
                <div className="hero-stat">
                  <div className={`hero-stat-val ${failedCount > 0 ? "red" : ""}`}>{failedCount}</div>
                  <div className="hero-stat-lbl">Failed</div>
                </div>
              </div>
              <button className="hero-close" onClick={() => setHeroVisible(false)} title="Dismiss">×</button>
              <div className="hero-sign">
                made with <span className="heart">♥</span> by <b>Ankit</b>
              </div>
            </div>
          );
        })()}

        <div className="mg">

          {/* SIDEBAR */}
          <div className="sb">
            <div className="tabs">
              <button className={`tab ${sideTab === "profile" ? "on" : ""}`} onClick={() => setSideTab("profile")}>Profile</button>
              <button className={`tab ${sideTab === "whatsapp" ? "on" : ""}`} onClick={() => setSideTab("whatsapp")}>WA</button>
              <button className={`tab ${sideTab === "discover" ? "on" : ""}`} onClick={() => setSideTab("discover")}>Discover</button>
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
                <div className="ph">
                  <span className="pt">Your Identity</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {savedBadge && <span className="pbadge ok">Saved ✓</span>}
                    <button className="hi-clr" onClick={() => setNeedsOnboarding(true)} style={{ color: "var(--blue)" }}>Edit full</button>
                  </div>
                </div>
                <div className="pb">
                  <div className="fl"><label className="flb">Full Name</label><input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" /></div>
                  <div className="fl"><label className="flb">Reply-To Email</label><input type="email" value={profile.replyTo} onChange={e => setProfile(p => ({ ...p, replyTo: e.target.value }))} placeholder="you@gmail.com" /></div>
                  <div className="fl"><label className="flb">Current Role <span style={{ color: "var(--t4)", fontWeight: 400 }}>optional</span></label><input value={profile.currentRole || ""} onChange={e => setProfile(p => ({ ...p, currentRole: e.target.value }))} placeholder="e.g. Frontend Dev at XYZ" /></div>
                  <div className="fl">
                    <label className="flb">Your Pitch</label>
                    <div className="flh">Used to personalize every email</div>
                    <textarea value={profile.about} onChange={e => setProfile(p => ({ ...p, about: e.target.value }))} placeholder="Skills, experience, career goal, education..." style={{ marginTop: 6 }} />
                  </div>
                  {profile.skills?.length > 0 && (
                    <div className="fl">
                      <label className="flb">Skills</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                        {profile.skills.map(s => (
                          <span key={s} style={{ fontSize: 10, fontFamily: "var(--mono)", padding: "3px 9px", borderRadius: 20, background: "var(--blue-dim)", border: "1px solid rgba(47,129,247,.3)", color: "var(--blue)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
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
                      <button className="hi-clr" onClick={async () => {
                        const snapshot = failedMails;
                        setFailedMails([]);
                        if (user) {
                          try { await Promise.all(snapshot.map(f => deleteDoc(doc(db, "users", user.uid, "failed", String(f.id))))); } catch { }
                        }
                      }}>Clear</button>
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
                              <button className="inbox-dismiss" onClick={() => { setFailedMails(p => p.filter(x => x.id !== f.id)); removePersistedFailed(f.id); }}>✗ Remove</button>
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
                  <span className="pt">
                    Send History
                    {(() => {
                      const replied = history.filter(h => h.replied).length;
                      return replied > 0 ? <span style={{ marginLeft: 8, fontSize: 10, fontFamily: "var(--mono)", color: "var(--green)", fontWeight: 600, letterSpacing: 0 }}>· {replied} replied</span> : null;
                    })()}
                  </span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {history.some(h => h.status === "sent") && (
                      <button
                        className="hi-clr"
                        onClick={scanGmailReplies}
                        disabled={scanReplyState.running}
                        style={{ color: "var(--green)" }}
                        title="Scan Gmail for replies to your sent emails"
                      >
                        {scanReplyState.running
                          ? `Scanning ${scanReplyState.current}/${scanReplyState.total}…`
                          : "✦ Scan replies"}
                      </button>
                    )}
                    <button
                      className="hi-clr"
                      onClick={async () => {
                        if (!user) return;
                        try {
                          const hRef = collection(db, "users", user.uid, "history");
                          const hSnap = await getDocs(query(hRef, orderBy("sentAt", "desc"), limit(200)));
                          const docs = hSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                          setHistory(docs);
                          showToast(`Loaded ${docs.length} entries`, "ok");
                        } catch (e) { showToast("Refresh failed: " + e.message, "err"); }
                      }}
                      style={{ color: "var(--blue)" }}
                    >↻ Refresh</button>
                    {history.length > 0 && (
                      <button className="hi-clr" onClick={clearHistory}>Clear all</button>
                    )}
                  </div>
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
                            {h.replied && (
                              <span style={{
                                color: "#fff",
                                background: "linear-gradient(135deg, #3fb950, #2ea043)",
                                padding: "1px 7px",
                                borderRadius: 10,
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: ".3px",
                                boxShadow: "0 0 8px rgba(63,185,80,.4)",
                              }} title={`Reply ${h.repliedAt ? fmtRelTime(h.repliedAt) : ""}${h.replySubject ? `: "${h.replySubject}"` : ""}`}>
                                ✦ REPLIED
                              </span>
                            )}
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

            {sideTab === "discover" && (
              <div className="panel">
                <div className="ph">
                  <span className="pt">Discover HR Emails</span>
                  {discoverResult && <span className="pbadge ok">{discoverResult.added} added</span>}
                </div>
                <div className="pb">
                  <div className="srv-note">
                    Scans Naukri, Foundit, Hirist, Instahyre, and {discoverCity === "ahmedabad" ? "15+ Ahmedabad IT company" : "company"} careers pages. Found HR emails land in your <b>Inbox</b>.
                  </div>

                  <div className="fl">
                    <label className="flb">City</label>
                    <select
                      value={discoverCity}
                      onChange={e => setDiscoverCity(e.target.value)}
                      style={{ fontFamily: "var(--sans)", fontSize: 13, background: "var(--bg)", color: "var(--text)", border: "1px solid var(--b1)", borderRadius: "var(--r)", padding: "9px 12px", width: "100%" }}
                      disabled={discoverLoading}
                    >
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="pune">Pune</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="chennai">Chennai</option>
                      <option value="gurgaon">Gurgaon</option>
                      <option value="noida">Noida</option>
                      <option value="delhi">Delhi</option>
                    </select>
                  </div>

                  <div className="fl">
                    <label className="flb">Role / Keywords</label>
                    <input
                      value={discoverRole}
                      onChange={e => setDiscoverRole(e.target.value)}
                      placeholder="e.g. software engineer, frontend developer"
                      disabled={discoverLoading}
                    />
                    <div className="flh">What role you're searching for</div>
                  </div>

                  <button
                    className="wa-btn wa-connect"
                    onClick={runDiscover}
                    disabled={discoverLoading}
                    style={{ marginTop: 4 }}
                  >
                    {discoverLoading ? <><span className="spin">⟳</span> Scanning (30-60s)...</> : <>🔍 Sync Now</>}
                  </button>

                  {discoverResult && (
                    <div style={{ marginTop: 8, padding: 10, background: "var(--bg)", border: "1px solid var(--b1)", borderRadius: 8, fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)", display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflowY: "auto" }}>
                      <div style={{ color: "var(--green)", fontWeight: 600 }}>✓ {discoverResult.totalFound} unique · {discoverResult.added} new</div>
                      {discoverResult.sources.map((s, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                          <span style={{ color: s.error ? "var(--red)" : s.found > 0 ? "var(--green)" : "var(--t4)" }}>
                            {s.error ? "✗" : s.found}
                          </span>
                        </div>
                      ))}
                      {discoverResult.added > 0 && (
                        <button className="wa-btn" onClick={() => setSideTab("inbox")} style={{ marginTop: 6, background: "var(--blue-dim)", border: "1px solid var(--blue-glow)", color: "var(--blue)" }}>
                          → Open Inbox
                        </button>
                      )}
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
                              type="text"
                              name="wa-role-filter"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck={false}
                              data-1p-ignore
                              data-lpignore="true"
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
                    <button
                      className="hi-clr"
                      onClick={async () => {
                        try {
                          const { inbox } = await waFetch("/wa/inbox");
                          syncInbox(inbox || []);
                          showToast(`Refreshed: ${(inbox || []).filter(x => x.status === "pending").length} pending`, "ok");
                        } catch (e) { showToast("Refresh failed: " + e.message, "err"); }
                      }}
                      style={{ color: "var(--blue)" }}
                    >↻ Refresh</button>
                    <button className="inbox-apply" onClick={() => setManualOpen(true)} style={{ fontSize: 9, padding: "3px 8px", background: "var(--blue-dim)", borderColor: "var(--blue-glow)", color: "var(--blue)" }}>
                      + Add
                    </button>
                    {pendingInboxCount > 0 && (
                      <button className="inbox-apply" onClick={inboxApplyAll} style={{ fontSize: 9, padding: "3px 8px" }}>
                        ✓ Apply All ({pendingInboxCount})
                      </button>
                    )}
                    {pendingInboxCount > 0 && <span className="pbadge">{pendingInboxCount} new</span>}
                  </div>
                </div>
                <div className="pb">
                  {waInbox.length === 0 ? (
                    <div className="hempty">
                      No HR emails yet.<br />
                      Use <b>Discover</b>, <b>WA</b>, or <b>+ Add</b> to fill the inbox.
                    </div>
                  ) : (
                    <div className="hlist">
                      {visibleInbox.map(item => (
                        <div
                          key={item.id}
                          className="inbox-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => { console.log("[inbox] open detail", item.id); setInboxPreview(item); }}
                        >
                          <div className="hi-row">
                            <div className="hi-co">{item.company || item.jobTitle || item.email}</div>
                            <div className="hi-time">{fmtRelTime(item.ts)}</div>
                          </div>
                          <div className="hi-email">{item.email}</div>
                          {item.jobTitle && item.company && <div className="hi-sub">{item.jobTitle}</div>}
                          {item.snippet && <div className="inbox-snip">{item.snippet}</div>}
                          <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "var(--t4)" }}>
                            from: {item.groupName}
                          </div>
                          <div className="inbox-acts" onClick={e => e.stopPropagation()}>
                            <button className="inbox-apply" type="button" onClick={e => { e.stopPropagation(); inboxApply(item); }}>✓ Apply</button>
                            <button className="inbox-dismiss" type="button" onClick={e => { e.stopPropagation(); inboxDismiss(item.id); }}>✗ Skip</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* API Keys — user-supplied, stored in browser only */}
            <div className="panel">
              <div className="ph">
                <span className="pt">API Keys</span>
                <span className="pbadge" style={{ color: "var(--green)", borderColor: "rgba(63,185,80,.25)", background: "rgba(63,185,80,.08)" }}>Your own</span>
              </div>
              <div className="pb">
                <div className="key-secure">
                  <span className="key-secure-ico">🔒</span>
                  <span><b>Stored in your browser only.</b> Never sent to our servers or synced to the cloud. Clears on sign-out.</span>
                </div>

                {/* Gmail credentials — required to send */}
                <div className="fl">
                  <label className="flb">
                    <span>Your Gmail Address</span>
                    <span className="opt">used as sender</span>
                  </label>
                  <div className="key-row">
                    <input
                      type="email"
                      value={apiKeys.gmailUser}
                      onChange={e => setApiKeys(k => ({ ...k, gmailUser: e.target.value }))}
                      placeholder="you@gmail.com"
                      name="gmail-user-input"
                      autoComplete="off"
                      data-1p-ignore
                      data-lpignore="true"
                    />
                  </div>
                </div>

                <div className="fl">
                  <label className="flb">
                    <span>Gmail App Password</span>
                    <span className="opt">16 chars, no spaces</span>
                  </label>
                  <div className="key-row">
                    <input
                      type={showGmailPwd ? "text" : "password"}
                      value={apiKeys.gmailAppPassword}
                      onChange={e => setApiKeys(k => ({ ...k, gmailAppPassword: e.target.value }))}
                      placeholder="abcd efgh ijkl mnop"
                      name="gmail-app-password-input"
                      autoComplete="new-password"
                      spellCheck={false}
                      data-1p-ignore
                      data-lpignore="true"
                    />
                    <button className="key-eye" type="button" onClick={() => setShowGmailPwd(s => !s)} title={showGmailPwd ? "Hide" : "Show"}>
                      {showGmailPwd ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  <div className={`key-status ${apiKeys.gmailAppPassword ? "set" : "empty"}`}>
                    <span className="key-status-dot" />
                    {apiKeys.gmailAppPassword ? "Saved" : "Not set — required to send"}
                    {" · "}
                    <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer" style={{ color: "var(--blue)", textDecoration: "none" }}>generate one ↗</a>
                  </div>
                </div>

                <div className="fl">
                  <label className="flb">
                    <span>Claude API Key</span>
                    <span className="opt">for Anthropic</span>
                  </label>
                  <div className="key-row">
                    <input
                      type={showClaudeKey ? "text" : "password"}
                      value={apiKeys.claude}
                      onChange={e => setApiKeys(k => ({ ...k, claude: e.target.value }))}
                      placeholder="sk-ant-..."
                      name="claude-api-key-input"
                      autoComplete="new-password"
                      spellCheck={false}
                      data-1p-ignore
                      data-lpignore="true"
                    />
                    <button className="key-eye" type="button" onClick={() => setShowClaudeKey(s => !s)} title={showClaudeKey ? "Hide" : "Show"}>
                      {showClaudeKey ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  <div className={`key-status ${apiKeys.claude ? "set" : "empty"}`}>
                    <span className="key-status-dot" />
                    {apiKeys.claude ? `Saved · ${apiKeys.claude.slice(0, 8)}…${apiKeys.claude.slice(-4)}` : "Not set"}
                    {apiKeys.claude && (
                      <>
                        · <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" style={{ color: "var(--blue)", textDecoration: "none" }}>manage ↗</a>
                      </>
                    )}
                  </div>
                </div>

                <div className="fl">
                  <label className="flb">
                    <span>OpenAI API Key</span>
                    <span className="opt">for ChatGPT</span>
                  </label>
                  <div className="key-row">
                    <input
                      type={showOpenaiKey ? "text" : "password"}
                      value={apiKeys.openai}
                      onChange={e => setApiKeys(k => ({ ...k, openai: e.target.value }))}
                      placeholder="sk-..."
                      name="openai-api-key-input"
                      autoComplete="new-password"
                      spellCheck={false}
                      data-1p-ignore
                      data-lpignore="true"
                    />
                    <button className="key-eye" type="button" onClick={() => setShowOpenaiKey(s => !s)} title={showOpenaiKey ? "Hide" : "Show"}>
                      {showOpenaiKey ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  <div className={`key-status ${apiKeys.openai ? "set" : "empty"}`}>
                    <span className="key-status-dot" />
                    {apiKeys.openai ? `Saved · ${apiKeys.openai.slice(0, 8)}…${apiKeys.openai.slice(-4)}` : "Not set"}
                    {apiKeys.openai && (
                      <>
                        · <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{ color: "var(--blue)", textDecoration: "none" }}>manage ↗</a>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="savebtn"
                    onClick={() => {
                      const cleaned = {
                        claude: (apiKeys.claude || "").trim(),
                        openai: (apiKeys.openai || "").trim(),
                        gmailUser: (apiKeys.gmailUser || "").trim(),
                        gmailAppPassword: (apiKeys.gmailAppPassword || "").replace(/\s+/g, ""),
                      };
                      if (cleaned.claude && !cleaned.claude.startsWith("sk-ant-")) {
                        showToast("Claude key should start with 'sk-ant-'", "err"); return;
                      }
                      if (cleaned.openai && !cleaned.openai.startsWith("sk-")) {
                        showToast("OpenAI key should start with 'sk-'", "err"); return;
                      }
                      if (cleaned.gmailUser && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.gmailUser)) {
                        showToast("Gmail address looks invalid", "err"); return;
                      }
                      if (cleaned.gmailAppPassword && cleaned.gmailAppPassword.length !== 16) {
                        showToast("Gmail App Password is exactly 16 chars (no spaces)", "err"); return;
                      }
                      setApiKeys(cleaned);
                      try {
                        localStorage.setItem(`hr_apikeys_${user.uid}`, JSON.stringify(cleaned));
                        showToast("Saved locally", "ok");
                      } catch (e) { showToast("Save failed: " + e.message, "err"); }
                    }}
                    style={{ flex: 1 }}
                  >
                    🔒 Save
                  </button>
                  {(apiKeys.claude || apiKeys.openai || apiKeys.gmailUser || apiKeys.gmailAppPassword) && (
                    <button
                      className="savebtn"
                      onClick={() => {
                        if (!confirm("Remove both API keys from this browser?")) return;
                        setApiKeys({ claude: "", openai: "", gmailUser: "", gmailAppPassword: "" });
                        try { localStorage.removeItem(`hr_apikeys_${user.uid}`); } catch { }
                        showToast("Keys cleared", "ok");
                      }}
                      style={{ flex: 0, padding: "10px 14px", color: "var(--red)", borderColor: "rgba(248,81,73,.25)" }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

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

                    {/* Mode Toggle: Apply vs Referral */}
                    <div className="tabs" style={{ margin: "0 8px", padding: 2, width: 140, height: 26 }}>
                      <button className={`tab ${(r.mode || "apply") === "apply" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "mode", "apply")} disabled={running}>Apply</button>
                      <button className={`tab ${r.mode === "referral" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "mode", "referral")} disabled={running}>Referral</button>
                    </div>

                    {/* Model Toggle */}
                    <div className="tabs" style={{ margin: "0 8px", padding: 2, width: 130, height: 26 }}>
                      <button className={`tab ${r.preferAi === "claude" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "preferAi", "claude")}>Claude</button>
                      <button className={`tab ${r.preferAi === "openai" ? "on" : ""}`} style={{ fontSize: 9 }} onClick={() => upd(r.id, "preferAi", "openai")}>ChatGPT</button>
                    </div>

                    {/* Cover Letter PDF toggle */}
                    <button
                      type="button"
                      title={r.coverLetter ? "Cover letter PDF will be attached" : "Add cover letter PDF"}
                      onClick={() => upd(r.id, "coverLetter", !r.coverLetter)}
                      disabled={running}
                      style={{
                        height: 26,
                        padding: "0 10px",
                        fontSize: 10,
                        fontFamily: "var(--mono)",
                        fontWeight: 600,
                        borderRadius: 6,
                        border: "1px solid",
                        borderColor: r.coverLetter ? "rgba(163,113,247,.5)" : "var(--b1)",
                        background: r.coverLetter ? "var(--purple-dim)" : "var(--bg)",
                        color: r.coverLetter ? "var(--purple)" : "var(--t3)",
                        cursor: running ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        whiteSpace: "nowrap",
                        marginRight: 8,
                      }}
                    >
                      {r.coverLetter ? "📄 +CL" : "+ CL"}
                    </button>

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
                    <div className="fl ff"><label className="flb">{r.mode === "referral" ? "Employee Email *" : "HR Email *"}</label><input value={r.email} disabled={running} onChange={e => upd(r.id, "email", e.target.value)} placeholder={r.mode === "referral" ? "someone@company.com" : "hr@company.com"} type="email" /></div>
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
        <div className="mbg" onClick={e => { if (e.target === e.currentTarget) setPreviewRec(null) }}>
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

      {manualOpen && (
        <div className="mbg" onClick={e => { if (e.target === e.currentTarget) setManualOpen(false) }}>
          <div className="modal">
            <div className="mhd">
              <div className="mico">➕</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mto">Add to Inbox</div>
                <div className="msub">Manual entry — single or bulk</div>
              </div>
              <button className="mcls" onClick={() => setManualOpen(false)}>×</button>
            </div>

            <div style={{ padding: "12px 20px", display: "flex", gap: 6, borderBottom: "1px solid var(--b1)" }}>
              <button
                onClick={() => setManualMode("single")}
                style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid", borderColor: manualMode === "single" ? "var(--blue)" : "var(--b1)", background: manualMode === "single" ? "var(--blue-dim)" : "var(--s2)", color: manualMode === "single" ? "var(--blue)" : "var(--t3)", fontSize: 12, fontWeight: 500 }}
              >Single</button>
              <button
                onClick={() => setManualMode("bulk")}
                style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid", borderColor: manualMode === "bulk" ? "var(--blue)" : "var(--b1)", background: manualMode === "bulk" ? "var(--blue-dim)" : "var(--s2)", color: manualMode === "bulk" ? "var(--blue)" : "var(--t3)", fontSize: 12, fontWeight: 500 }}
              >Bulk</button>
              <button
                onClick={() => setManualMode("file")}
                style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid", borderColor: manualMode === "file" ? "var(--blue)" : "var(--b1)", background: manualMode === "file" ? "var(--blue-dim)" : "var(--s2)", color: manualMode === "file" ? "var(--blue)" : "var(--t3)", fontSize: 12, fontWeight: 500 }}
              >📎 File</button>
            </div>

            <div className="mbdy" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--sans)" }}>
              {manualMode === "single" ? (
                <>
                  <div className="fl">
                    <label className="flb">HR Email *</label>
                    <input type="email" value={manualForm.email} onChange={e => setManualForm(f => ({ ...f, email: e.target.value }))} placeholder="hr@company.com" />
                  </div>
                  <div className="fl">
                    <label className="flb">Company</label>
                    <input value={manualForm.company} onChange={e => setManualForm(f => ({ ...f, company: e.target.value }))} placeholder="e.g. Google" />
                  </div>
                  <div className="fl">
                    <label className="flb">Role / Job Title</label>
                    <input value={manualForm.jobTitle} onChange={e => setManualForm(f => ({ ...f, jobTitle: e.target.value }))} placeholder="e.g. Frontend Engineer" />
                  </div>
                  <div className="fl">
                    <label className="flb">Note <span style={{ color: "var(--t4)", fontWeight: 400 }}>optional</span></label>
                    <textarea value={manualForm.note} onChange={e => setManualForm(f => ({ ...f, note: e.target.value }))} placeholder="Context — referral, requirements, etc." style={{ minHeight: 60 }} />
                  </div>
                </>
              ) : manualMode === "bulk" ? (
                <>
                  <div className="fl">
                    <label className="flb">Paste emails (one per line, or comma/semicolon separated)</label>
                    <textarea
                      value={bulkText}
                      onChange={e => setBulkText(e.target.value)}
                      placeholder={"hr@google.com\nrecruiter@meta.com\nhiring@stripe.com"}
                      style={{ minHeight: 180, fontFamily: "var(--mono)", fontSize: 12 }}
                    />
                    <div className="flh" style={{ marginTop: 4 }}>
                      {(() => {
                        const count = (bulkText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).length;
                        return count > 0 ? `${count} email${count !== 1 ? "s" : ""} detected` : "No emails detected yet";
                      })()}
                    </div>
                  </div>
                </>
              ) : (
                /* File mode */
                <>
                  <div className="fl">
                    <label className="flb">
                      <span>Upload PDF or screenshot</span>
                      <span className="opt">Claude reads and extracts</span>
                    </label>
                    <input
                      ref={extractFileRef}
                      type="file"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) { setExtractFile(f); runExtract(f); }
                      }}
                    />
                    <div
                      className="dz"
                      onClick={() => extractFileRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        const f = e.dataTransfer.files?.[0];
                        if (f) { setExtractFile(f); runExtract(f); }
                      }}
                      style={{ padding: 24 }}
                    >
                      <div className="dz-ico">{extractLoading ? <span className="spin">⟳</span> : extractFile ? "📄" : "📁"}</div>
                      <div className="dz-txt">
                        {extractLoading ? <em>Reading with Claude Vision…</em>
                          : extractFile ? <><b style={{ color: "var(--text)" }}>{extractFile.name}</b><br />click to choose another</>
                          : <><em>Click to upload</em> or drag PDF / screenshot<br />Job posting, flyer, JD doc — anything with HR emails</>}
                      </div>
                    </div>
                  </div>

                  {extractItems.length > 0 && (
                    <div className="fl">
                      <label className="flb">Found {extractItems.length} HR contact{extractItems.length !== 1 ? "s" : ""} — uncheck to skip</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 280, overflowY: "auto" }}>
                        {extractItems.map((it, i) => (
                          <label key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: it._selected ? "var(--blue-dim)" : "var(--s2)", border: "1px solid", borderColor: it._selected ? "rgba(47,129,247,.4)" : "var(--b1)", borderRadius: 8, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={it._selected}
                              onChange={() => setExtractItems(p => p.map((x, j) => j === i ? { ...x, _selected: !x._selected } : x))}
                              style={{ marginTop: 2 }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                                {it.company || it.jobTitle || it.email}
                              </div>
                              {it.jobTitle && it.company && <div style={{ fontSize: 11, color: "var(--t2)" }}>{it.jobTitle}</div>}
                              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--blue)" }}>{it.email}</div>
                              {it.snippet && <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 4, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{it.snippet}</div>}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mftr">
              <button className="sb-btn sbcopy" onClick={() => setManualOpen(false)}>Cancel</button>
              <button className="sb-btn sbsend" onClick={submitManual} style={{ marginLeft: "auto" }}>✓ Add to Inbox</button>
            </div>
          </div>
        </div>
      )}

      {inboxPreview && (
        <div className="mbg" onClick={e => { if (e.target === e.currentTarget) setInboxPreview(null) }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="mhd">
              <div className="mico">📨</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mto">
                  HR Email: <span>{inboxPreview.email}</span>
                </div>
                <div className="msub">{inboxPreview.jobTitle || inboxPreview.company || "HR Contact"}</div>
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
                {inboxPreview.snippet && (
                  <div>
                    <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>Original Message</div>
                    <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t2)", lineHeight: 1.7, whiteSpace: "pre-wrap", background: "var(--bg)", padding: 12, borderRadius: 8, border: "1px solid var(--b1)", maxHeight: 240, overflowY: "auto" }}>
                      {inboxPreview.snippet}
                    </div>
                  </div>
                )}
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
        <div className="mbg" onClick={e => { if (e.target === e.currentTarget) setHistoryPreview(null) }}>
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
                  {historyPreview.replied && (
                    <span style={{ marginLeft: 8, color: "var(--green)", fontWeight: 600 }}>
                      · ✦ Replied {fmtRelTime(historyPreview.repliedAt)}
                    </span>
                  )}
                </div>
                {historyPreview.replied && historyPreview.replySubject && (
                  <div className="mto" style={{ marginTop: 2, fontSize: 10, color: "var(--t2)" }}>
                    Reply: "{historyPreview.replySubject}"
                  </div>
                )}
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
