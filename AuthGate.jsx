import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
  --r:10px;--rl:14px;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans)}
.auth-bg{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 60% 40%, rgba(47,129,247,.08) 0%, transparent 60%),
             radial-gradient(ellipse at 20% 80%, rgba(47,129,247,.05) 0%, transparent 50%),
             var(--bg);
}
.auth-card{
  background:var(--s1);border:1px solid var(--b1);border-radius:20px;
  padding:48px 40px;width:min(420px,94vw);text-align:center;
  box-shadow:0 20px 60px rgba(0,0,0,.5);
  animation:caup .3s ease;
}
@keyframes caup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.auth-logo{
  width:56px;height:56px;border-radius:14px;
  background:linear-gradient(135deg,#2f81f7,#1a6fd4);
  display:flex;align-items:center;justify-content:center;
  font-size:24px;margin:0 auto 20px;
  box-shadow:0 4px 16px rgba(47,129,247,.4);
}
.auth-title{font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:8px}
.auth-sub{font-size:13px;color:var(--t3);line-height:1.6;margin-bottom:36px}
.google-btn{
  display:flex;align-items:center;justify-content:center;gap:12px;
  width:100%;padding:13px 20px;
  background:var(--s2);border:1px solid var(--b2);border-radius:var(--r);
  color:var(--text);font-family:var(--sans);font-size:14px;font-weight:600;
  cursor:pointer;transition:all .2s;
}
.google-btn:hover:not(:disabled){
  border-color:var(--blue);background:var(--blue-dim);
  box-shadow:0 0 0 3px var(--blue-glow);
}
.google-btn:disabled{opacity:.5;cursor:not-allowed}
.google-btn svg{flex-shrink:0}
.auth-err{
  margin-top:16px;padding:10px 14px;border-radius:var(--r);
  background:rgba(248,81,73,.1);border:1px solid rgba(248,81,73,.25);
  color:#f85149;font-size:12px;font-family:var(--mono);
}
.auth-footer{margin-top:24px;font-size:11px;color:var(--t4);line-height:1.6}
`;

export default function AuthGate({ onUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
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
        <div className="auth-card">
          <div className="auth-logo">✉️</div>
          <div className="auth-title">HR Outreach Agent</div>
          <div className="auth-sub">
            AI-powered personalized email outreach.<br />
            Sign in to save your files and profile.
          </div>
          <button className="google-btn" onClick={signIn} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4A90E2" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"/>
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
          {error && <div className="auth-err">{error}</div>}
          <div className="auth-footer">
            Your files are stored securely in Firebase Storage,<br />
            linked only to your Google account.
          </div>
        </div>
      </div>
    </>
  );
}
