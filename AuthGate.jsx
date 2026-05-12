import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;--s3:#21262d;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --purple:#a371f7;--purple-dim:rgba(163,113,247,.12);
  --green:#3fb950;
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
  --r:10px;--rl:14px;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans);overflow:hidden}

.auth-bg{
  position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:var(--bg);overflow:hidden;
}

/* Animated gradient mesh background */
.auth-bg::before{
  content:'';position:absolute;inset:-50%;
  background:
    radial-gradient(circle at 20% 20%, rgba(47,129,247,.15) 0%, transparent 35%),
    radial-gradient(circle at 80% 40%, rgba(163,113,247,.12) 0%, transparent 35%),
    radial-gradient(circle at 50% 80%, rgba(63,185,80,.08) 0%, transparent 35%),
    radial-gradient(circle at 10% 90%, rgba(47,129,247,.10) 0%, transparent 30%);
  animation:meshShift 18s ease-in-out infinite;
  z-index:0;pointer-events:none;
}
@keyframes meshShift{
  0%,100%{transform:translate(0,0) rotate(0deg) scale(1)}
  33%{transform:translate(-5%,3%) rotate(2deg) scale(1.05)}
  66%{transform:translate(4%,-2%) rotate(-1.5deg) scale(.97)}
}

/* Floating orbs */
.orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.4;pointer-events:none;z-index:0}
.orb-1{width:380px;height:380px;background:var(--blue);top:-100px;left:-100px;animation:orb1 16s ease-in-out infinite}
.orb-2{width:340px;height:340px;background:var(--purple);bottom:-120px;right:-120px;animation:orb2 20s ease-in-out infinite}
.orb-3{width:260px;height:260px;background:#3fb950;top:50%;left:70%;animation:orb3 22s ease-in-out infinite}
@keyframes orb1{0%,100%{transform:translate(0,0)}50%{transform:translate(100px,80px)}}
@keyframes orb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-120px,-80px)}}
@keyframes orb3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-80px,60px) scale(1.15)}}

/* Grid pattern overlay */
.auth-bg::after{
  content:'';position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(48,54,61,.25) 1px, transparent 1px),
    linear-gradient(90deg, rgba(48,54,61,.25) 1px, transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(circle at center, black 30%, transparent 75%);
  -webkit-mask-image:radial-gradient(circle at center, black 30%, transparent 75%);
  opacity:.35;
}

/* Floating particles */
.particle{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--blue);opacity:.5;pointer-events:none;z-index:0;box-shadow:0 0 12px var(--blue)}
.particle:nth-child(1){top:15%;left:10%;animation:float 12s ease-in-out infinite}
.particle:nth-child(2){top:30%;left:85%;background:var(--purple);box-shadow:0 0 12px var(--purple);animation:float 14s ease-in-out infinite 1s}
.particle:nth-child(3){top:70%;left:15%;animation:float 16s ease-in-out infinite 2s}
.particle:nth-child(4){top:80%;left:80%;background:#3fb950;box-shadow:0 0 12px #3fb950;animation:float 13s ease-in-out infinite 3s}
.particle:nth-child(5){top:45%;left:50%;animation:float 18s ease-in-out infinite 1.5s}
.particle:nth-child(6){top:20%;left:50%;background:var(--purple);box-shadow:0 0 12px var(--purple);animation:float 15s ease-in-out infinite 4s}
.particle:nth-child(7){top:60%;left:92%;animation:float 17s ease-in-out infinite 2.5s}
.particle:nth-child(8){top:85%;left:45%;background:#3fb950;box-shadow:0 0 12px #3fb950;animation:float 19s ease-in-out infinite}
@keyframes float{
  0%,100%{transform:translate(0,0);opacity:.3}
  50%{transform:translate(50px,-40px);opacity:.9}
}

.auth-card{
  position:relative;z-index:1;
  background:linear-gradient(180deg, rgba(28,33,40,.9) 0%, rgba(22,27,34,.95) 100%);
  border:1px solid rgba(255,255,255,.08);
  border-radius:24px;
  padding:52px 44px 40px;
  width:min(440px,94vw);
  text-align:center;
  box-shadow:
    0 30px 80px rgba(0,0,0,.6),
    0 0 0 1px rgba(255,255,255,.02) inset,
    0 40px 100px -20px rgba(47,129,247,.15);
  backdrop-filter:blur(24px) saturate(140%);
  -webkit-backdrop-filter:blur(24px) saturate(140%);
  animation:caup .7s cubic-bezier(.22,1,.36,1);
}
@keyframes caup{
  from{opacity:0;transform:translateY(30px) scale(.96)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

/* Animated gradient border glow */
.auth-card::before{
  content:'';position:absolute;inset:-1px;border-radius:24px;padding:1px;
  background:linear-gradient(135deg, rgba(47,129,247,.4), rgba(163,113,247,.3), rgba(63,185,80,.2), rgba(47,129,247,.4));
  background-size:300% 300%;
  -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;
  animation:borderShift 8s linear infinite;
}
@keyframes borderShift{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

.auth-logo-wrap{
  position:relative;width:72px;height:72px;margin:0 auto 24px;
  animation:logoIn .8s cubic-bezier(.22,1,.36,1) .1s both;
}
@keyframes logoIn{
  from{opacity:0;transform:scale(.5) rotate(-10deg)}
  to{opacity:1;transform:scale(1) rotate(0)}
}
.auth-logo{
  width:72px;height:72px;border-radius:18px;
  background:linear-gradient(135deg,#2f81f7 0%,#1a6fd4 50%,#a371f7 100%);
  background-size:200% 200%;
  display:flex;align-items:center;justify-content:center;
  font-size:30px;
  box-shadow:
    0 8px 24px rgba(47,129,247,.45),
    0 0 0 1px rgba(255,255,255,.1) inset,
    0 -2px 8px rgba(255,255,255,.1) inset;
  animation:logoShift 6s ease-in-out infinite;
  position:relative;
}
@keyframes logoShift{
  0%,100%{background-position:0% 50%}
  50%{background-position:100% 50%}
}
.auth-logo::after{
  content:'';position:absolute;inset:-8px;border-radius:22px;
  background:linear-gradient(135deg, rgba(47,129,247,.3), rgba(163,113,247,.3));
  filter:blur(16px);opacity:.6;z-index:-1;
  animation:logoPulse 3s ease-in-out infinite;
}
@keyframes logoPulse{
  0%,100%{opacity:.5;transform:scale(1)}
  50%{opacity:.9;transform:scale(1.1)}
}

.auth-title{
  font-size:28px;font-weight:800;letter-spacing:-.8px;margin-bottom:10px;
  background:linear-gradient(135deg,#e6edf3 0%,#adbac7 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  animation:fadeUp .7s ease .2s both;
}
.auth-sub{
  font-size:14px;color:var(--t3);line-height:1.65;margin-bottom:40px;
  animation:fadeUp .7s ease .3s both;
}
.auth-sub strong{color:var(--t2);font-weight:500}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(10px)}
  to{opacity:1;transform:translateY(0)}
}

/* Feature chips */
.auth-chips{
  display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;
  animation:fadeUp .7s ease .35s both;
}
.chip{
  font-size:10px;font-family:var(--mono);padding:5px 10px;border-radius:20px;
  background:var(--s3);border:1px solid var(--b1);color:var(--t3);
  display:inline-flex;align-items:center;gap:5px;
  transition:all .2s;
}
.chip-dot{width:5px;height:5px;border-radius:50%;background:var(--blue);box-shadow:0 0 6px var(--blue)}
.chip:nth-child(2) .chip-dot{background:var(--purple);box-shadow:0 0 6px var(--purple)}
.chip:nth-child(3) .chip-dot{background:var(--green);box-shadow:0 0 6px var(--green)}

.google-btn{
  position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;gap:12px;
  width:100%;padding:15px 20px;
  background:linear-gradient(180deg, #21262d 0%, #1c2128 100%);
  border:1px solid var(--b2);border-radius:12px;
  color:var(--text);font-family:var(--sans);font-size:15px;font-weight:600;
  cursor:pointer;transition:all .25s cubic-bezier(.22,1,.36,1);
  animation:fadeUp .7s ease .4s both;
  box-shadow:0 4px 16px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.03) inset;
}
.google-btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg, rgba(47,129,247,.2), rgba(163,113,247,.15));
  opacity:0;transition:opacity .25s;
}
.google-btn:hover:not(:disabled)::before{opacity:1}
.google-btn:hover:not(:disabled){
  border-color:var(--blue);
  transform:translateY(-2px);
  box-shadow:
    0 8px 24px rgba(47,129,247,.3),
    0 0 0 3px var(--blue-glow),
    0 0 0 1px rgba(255,255,255,.05) inset;
}
.google-btn:active:not(:disabled){transform:translateY(0)}
.google-btn:disabled{opacity:.6;cursor:not-allowed}
.google-btn svg{flex-shrink:0;position:relative;z-index:1}
.google-btn span{position:relative;z-index:1}

/* Shimmer on button */
.google-btn::after{
  content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
  transition:left .7s;
}
.google-btn:hover:not(:disabled)::after{left:100%}

.auth-err{
  margin-top:16px;padding:11px 14px;border-radius:var(--r);
  background:rgba(248,81,73,.1);border:1px solid rgba(248,81,73,.25);
  color:#f85149;font-size:12px;font-family:var(--mono);
  animation:shake .4s ease, fadeUp .3s ease;
  text-align:left;line-height:1.5;
}
@keyframes shake{
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}

.auth-divider{
  display:flex;align-items:center;gap:10px;margin:28px 0 18px;
  font-size:10px;font-family:var(--mono);color:var(--t4);letter-spacing:1px;
  animation:fadeUp .7s ease .5s both;
}
.auth-divider::before,.auth-divider::after{
  content:'';flex:1;height:1px;
  background:linear-gradient(90deg, transparent, var(--b1), transparent);
}

.auth-footer{
  font-size:11px;color:var(--t4);line-height:1.7;font-family:var(--mono);
  animation:fadeUp .7s ease .55s both;
}
.auth-footer-icon{display:inline-block;margin-right:4px;color:var(--green)}

.spin{display:inline-block;animation:sp .8s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
`;

export default function AuthGate({ onUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Capture Google OAuth access token (needed for Gmail API reply scanning).
      // Stored in sessionStorage so it survives page reload but not browser close.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        try { sessionStorage.setItem(`gmail_token_${result.user.uid}`, credential.accessToken); } catch { }
      }
      onUser(result.user);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />

        <div className="auth-card">
          <div className="auth-logo-wrap">
            <div className="auth-logo">✉️</div>
          </div>
          <div className="auth-title">HR Outreach Agent</div>
          <div className="auth-sub">
            AI-powered personalized email outreach.<br />
            Find, draft, and send <strong>in minutes</strong> — not hours.
          </div>

          <div className="auth-chips">
            <span className="chip"><span className="chip-dot" /> AI-drafted</span>
            <span className="chip"><span className="chip-dot" /> Multi-source</span>
            <span className="chip"><span className="chip-dot" /> Auto-sync</span>
          </div>

          <button className="google-btn" onClick={signIn} disabled={loading}>
            {loading ? (
              <span className="spin">⟳</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 18 18">
                <path fill="#4A90E2" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"/>
              </svg>
            )}
            <span>{loading ? "Signing in..." : "Continue with Google"}</span>
          </button>

          {error && <div className="auth-err">{error}</div>}

          <div className="auth-divider">SECURE · PRIVATE · YOUR DATA</div>

          <div className="auth-footer">
            <span className="auth-footer-icon">🔒</span>Files stored in Firebase Storage,<br />
            linked only to your Google account.
          </div>
        </div>
      </div>
    </>
  );
}
