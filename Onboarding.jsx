import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;--s3:#21262d;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --purple:#a371f7;--purple-dim:rgba(163,113,247,.12);
  --green:#3fb950;--red:#f85149;
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans);-webkit-font-smoothing:antialiased}

.onb-bg{
  position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:var(--bg);overflow:hidden;padding:40px 20px;
}
.onb-bg::before{
  content:'';position:absolute;inset:-30%;z-index:0;pointer-events:none;
  background:
    radial-gradient(circle at 15% 20%, rgba(47,129,247,.15) 0%, transparent 40%),
    radial-gradient(circle at 85% 70%, rgba(163,113,247,.12) 0%, transparent 40%),
    radial-gradient(circle at 50% 90%, rgba(63,185,80,.07) 0%, transparent 35%);
  animation:meshShift 20s ease-in-out infinite;
}
@keyframes meshShift{
  0%,100%{transform:translate(0,0) scale(1)}
  50%{transform:translate(3%,-2%) scale(1.05)}
}
.orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.35;pointer-events:none;z-index:0}
.orb-1{width:380px;height:380px;background:var(--blue);top:-120px;left:-120px;animation:drift 18s ease-in-out infinite}
.orb-2{width:340px;height:340px;background:var(--purple);bottom:-140px;right:-140px;animation:drift 22s ease-in-out infinite reverse}
@keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(120px,80px)}}

.onb-card{
  position:relative;z-index:1;
  width:min(640px,96vw);
  background:linear-gradient(180deg, rgba(28,33,40,.88) 0%, rgba(22,27,34,.95) 100%);
  border:1px solid rgba(255,255,255,.08);
  border-radius:22px;
  box-shadow:0 30px 80px rgba(0,0,0,.6), 0 40px 100px -20px rgba(47,129,247,.15);
  backdrop-filter:blur(24px) saturate(140%);
  -webkit-backdrop-filter:blur(24px) saturate(140%);
  animation:cardIn .7s cubic-bezier(.22,1,.36,1);
  overflow:hidden;
}
@keyframes cardIn{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}

/* Header */
.onb-hd{
  padding:28px 32px 20px;border-bottom:1px solid var(--b1);
  display:flex;align-items:center;gap:14px;
  position:relative;
  background:linear-gradient(135deg, rgba(47,129,247,.04), rgba(163,113,247,.03));
}
.onb-avatar{
  width:44px;height:44px;border-radius:12px;overflow:hidden;
  border:2px solid rgba(47,129,247,.3);
  box-shadow:0 4px 16px rgba(47,129,247,.25);
  flex-shrink:0;
  background:linear-gradient(135deg,#2f81f7,#a371f7);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;font-weight:700;color:white;
}
.onb-avatar img{width:100%;height:100%;object-fit:cover}
.onb-hd-txt{flex:1;min-width:0}
.onb-welcome{font-size:11px;font-family:var(--mono);color:var(--t3);letter-spacing:1px;text-transform:uppercase;margin-bottom:2px}
.onb-name{
  font-size:20px;font-weight:700;letter-spacing:-.4px;
  background:linear-gradient(135deg,#e6edf3,#adbac7);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.onb-skip{
  padding:6px 12px;font-size:11px;font-family:var(--mono);color:var(--t3);
  background:transparent;border:1px solid var(--b1);border-radius:6px;cursor:pointer;
  transition:all .15s;
}
.onb-skip:hover{color:var(--text);border-color:var(--b2)}

/* Progress */
.onb-progress{
  height:3px;background:var(--s2);position:relative;
}
.onb-progress-fill{
  height:100%;background:linear-gradient(90deg,var(--blue),var(--purple));
  transition:width .4s cubic-bezier(.22,1,.36,1);
  box-shadow:0 0 12px var(--blue);
}

/* Body */
.onb-body{padding:32px}

.onb-step-head{margin-bottom:24px}
.onb-step-num{
  font-size:10px;font-family:var(--mono);color:var(--blue);letter-spacing:1.5px;font-weight:600;margin-bottom:6px;
  display:flex;align-items:center;gap:6px;
}
.onb-step-num::before{content:'';width:20px;height:1px;background:var(--blue)}
.onb-step-title{font-size:26px;font-weight:700;letter-spacing:-.6px;margin-bottom:6px;line-height:1.2}
.onb-step-sub{font-size:14px;color:var(--t3);line-height:1.5}

.onb-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
.onb-grid.full{grid-template-columns:1fr}
.fl{display:flex;flex-direction:column;gap:6px}
.fl.ff{grid-column:1/-1}
.flb{font-size:11px;font-weight:600;color:var(--t2);letter-spacing:.2px;display:flex;justify-content:space-between;align-items:center}
.flb .opt{color:var(--t4);font-weight:400;font-size:10px;letter-spacing:0}
input,textarea,select{
  font-family:var(--sans);font-size:14px;background:var(--bg);color:var(--text);
  border:1px solid var(--b1);border-radius:10px;padding:11px 14px;width:100%;outline:none;
  transition:all .2s;
}
input:focus,textarea:focus,select:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-glow);background:var(--s1)}
input::placeholder,textarea::placeholder{color:var(--t4)}
textarea{resize:vertical;min-height:90px;line-height:1.6;font-family:var(--sans)}

/* Chip input for skills */
.chips-wrap{
  display:flex;flex-wrap:wrap;gap:6px;padding:10px;min-height:48px;
  background:var(--bg);border:1px solid var(--b1);border-radius:10px;
  transition:all .2s;cursor:text;
}
.chips-wrap:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-glow);background:var(--s1)}
.chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:5px 10px;border-radius:20px;
  background:var(--blue-dim);border:1px solid rgba(47,129,247,.3);
  color:var(--blue);font-size:12px;font-weight:500;
  animation:chipIn .2s ease;
}
@keyframes chipIn{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
.chip button{
  background:none;border:none;color:var(--blue);cursor:pointer;font-size:14px;line-height:1;
  padding:0;opacity:.6;transition:opacity .15s;
}
.chip button:hover{opacity:1}
.chips-input{
  flex:1;min-width:100px;background:transparent;border:none;outline:none;padding:4px 6px;font-size:13px;color:var(--text);
}
.chips-input::placeholder{color:var(--t4)}

.chips-suggest{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.chip-suggest{
  font-size:10px;font-family:var(--mono);padding:4px 9px;border-radius:20px;
  background:var(--s3);border:1px solid var(--b1);color:var(--t3);cursor:pointer;
  transition:all .15s;
}
.chip-suggest:hover{color:var(--blue);border-color:var(--blue)}

/* Role selector buttons */
.role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:4px}
.role-btn{
  padding:12px 10px;border-radius:10px;
  background:var(--s2);border:1px solid var(--b1);color:var(--t2);
  cursor:pointer;transition:all .2s;font-family:var(--sans);
  display:flex;flex-direction:column;align-items:center;gap:4px;
}
.role-btn:hover{border-color:var(--b2);color:var(--text)}
.role-btn.on{background:var(--blue-dim);border-color:var(--blue);color:var(--blue);box-shadow:0 0 0 2px var(--blue-glow)}
.role-ico{font-size:18px}
.role-name{font-size:11px;font-weight:600}

/* Footer */
.onb-ft{
  padding:20px 32px;border-top:1px solid var(--b1);
  display:flex;align-items:center;gap:12px;
  background:var(--s1);
}
.onb-back{
  padding:10px 16px;border-radius:10px;
  background:transparent;border:1px solid var(--b1);color:var(--t2);
  font-family:var(--sans);font-size:13px;font-weight:500;cursor:pointer;
  transition:all .15s;
}
.onb-back:hover{border-color:var(--b2);color:var(--text)}
.onb-back:disabled{opacity:.4;cursor:not-allowed}
.onb-next{
  margin-left:auto;
  padding:11px 22px;border-radius:10px;
  background:linear-gradient(135deg,#2f81f7,#1a6fd4);
  border:none;color:white;
  font-family:var(--sans);font-size:14px;font-weight:600;cursor:pointer;
  transition:all .2s;display:flex;align-items:center;gap:8px;
  box-shadow:0 4px 16px rgba(47,129,247,.35);
}
.onb-next:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(47,129,247,.5)}
.onb-next:disabled{opacity:.5;cursor:not-allowed}

.spin{display:inline-block;animation:sp .6s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}

@media(max-width:600px){
  .onb-grid{grid-template-columns:1fr}
  .role-grid{grid-template-columns:repeat(2,1fr)}
  .onb-body{padding:24px 20px}
  .onb-hd{padding:20px}
  .onb-step-title{font-size:22px}
}
`;

const ROLE_OPTIONS = [
  { val: "frontend", ico: "⚡", label: "Frontend" },
  { val: "backend", ico: "🧩", label: "Backend" },
  { val: "fullstack", ico: "🌐", label: "Full Stack" },
  { val: "mobile", ico: "📱", label: "Mobile" },
  { val: "devops", ico: "⚙️", label: "DevOps" },
  { val: "data", ico: "📊", label: "Data / ML" },
  { val: "design", ico: "🎨", label: "Design" },
  { val: "pm", ico: "📋", label: "Product" },
  { val: "other", ico: "✨", label: "Other" },
];

const SKILL_SUGGESTIONS = [
  "React", "Node.js", "TypeScript", "Python", "Java", "Go",
  "AWS", "Docker", "Kubernetes", "GraphQL", "PostgreSQL", "MongoDB",
  "Next.js", "Tailwind", "Figma", "ML", "PyTorch", "Rust",
];

export default function Onboarding({ user, existingProfile, onComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: existingProfile?.name || user?.displayName || "",
    replyTo: existingProfile?.replyTo || user?.email || "",
    roleType: existingProfile?.roleType || "",
    experience: existingProfile?.experience || "",
    location: existingProfile?.location || "",
    currentRole: existingProfile?.currentRole || "",
    skills: existingProfile?.skills || [],
    about: existingProfile?.about || "",
    linkedin: existingProfile?.linkedin || "",
    portfolio: existingProfile?.portfolio || "",
  });
  const [chipInput, setChipInput] = useState("");
  const chipRef = useRef(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addChip = (val) => {
    const t = val.trim();
    if (!t || form.skills.includes(t) || form.skills.length >= 10) return;
    update("skills", [...form.skills, t]);
    setChipInput("");
  };
  const removeChip = (t) => update("skills", form.skills.filter(s => s !== t));

  const step1Valid = form.name.trim() && form.replyTo.trim() && form.roleType;
  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const finish = async () => {
    setSaving(true);
    try {
      await onComplete(form);
    } catch (e) {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="onb-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="onb-card">
          <div className="onb-hd">
            <div className="onb-avatar">
              {user?.photoURL ? <img src={user.photoURL} alt="" /> : (user?.displayName?.[0] || "U")}
            </div>
            <div className="onb-hd-txt">
              <div className="onb-welcome">Welcome to HR Agent</div>
              <div className="onb-name">Let's get you set up, {form.name.split(" ")[0] || "there"}</div>
            </div>
            {onSkip && <button className="onb-skip" onClick={onSkip}>Skip for now</button>}
          </div>

          <div className="onb-progress">
            <div className="onb-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="onb-body">
            {step === 1 && (
              <>
                <div className="onb-step-head">
                  <div className="onb-step-num">STEP 1 OF 2</div>
                  <h2 className="onb-step-title">Tell us about yourself</h2>
                  <div className="onb-step-sub">This helps us tailor every email you send.</div>
                </div>

                <div className="onb-grid">
                  <div className="fl">
                    <label className="flb">Full Name</label>
                    <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="fl">
                    <label className="flb">Reply-To Email</label>
                    <input type="email" value={form.replyTo} onChange={e => update("replyTo", e.target.value)} placeholder="you@gmail.com" />
                  </div>
                </div>

                <div className="fl ff" style={{ marginBottom: 16 }}>
                  <label className="flb">What kind of role are you looking for?</label>
                  <div className="role-grid">
                    {ROLE_OPTIONS.map(r => (
                      <button
                        key={r.val}
                        type="button"
                        className={`role-btn ${form.roleType === r.val ? "on" : ""}`}
                        onClick={() => update("roleType", r.val)}
                      >
                        <span className="role-ico">{r.ico}</span>
                        <span className="role-name">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="onb-grid">
                  <div className="fl">
                    <label className="flb">Years of Experience</label>
                    <select value={form.experience} onChange={e => update("experience", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="fresher">Fresher / Student</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="8+">8+ years</option>
                    </select>
                  </div>
                  <div className="fl">
                    <label className="flb">Location <span className="opt">optional</span></label>
                    <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Ahmedabad, India" />
                  </div>
                </div>

                <div className="fl ff" style={{ marginTop: 6 }}>
                  <label className="flb">Current Role <span className="opt">optional</span></label>
                  <input value={form.currentRole} onChange={e => update("currentRole", e.target.value)} placeholder="e.g. Frontend Developer at XYZ, or Final-year CS student" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="onb-step-head">
                  <div className="onb-step-num">STEP 2 OF 2</div>
                  <h2 className="onb-step-title">Your story, in short</h2>
                  <div className="onb-step-sub">Skills you excel at + a quick pitch. We'll weave these into every email naturally.</div>
                </div>

                <div className="fl ff" style={{ marginBottom: 16 }}>
                  <label className="flb">Top Skills <span className="opt">up to 10</span></label>
                  <div className="chips-wrap" onClick={() => chipRef.current?.focus()}>
                    {form.skills.map(s => (
                      <span key={s} className="chip">
                        {s}
                        <button type="button" onClick={() => removeChip(s)}>×</button>
                      </span>
                    ))}
                    <input
                      ref={chipRef}
                      className="chips-input"
                      value={chipInput}
                      onChange={e => setChipInput(e.target.value)}
                      onKeyDown={e => {
                        if ((e.key === "Enter" || e.key === ",") && chipInput.trim()) {
                          e.preventDefault();
                          addChip(chipInput);
                        } else if (e.key === "Backspace" && !chipInput && form.skills.length) {
                          removeChip(form.skills[form.skills.length - 1]);
                        }
                      }}
                      placeholder={form.skills.length === 0 ? "Type a skill and press Enter (e.g. React, Node.js)" : "Add another..."}
                    />
                  </div>
                  <div className="chips-suggest">
                    {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 10).map(s => (
                      <span key={s} className="chip-suggest" onClick={() => addChip(s)}>+ {s}</span>
                    ))}
                  </div>
                </div>

                <div className="fl ff" style={{ marginBottom: 16 }}>
                  <label className="flb">Your Pitch <span className="opt">2-3 sentences</span></label>
                  <textarea
                    value={form.about}
                    onChange={e => update("about", e.target.value)}
                    placeholder="e.g. Final-year CS student at SAL. Built 3 production React apps including an AI email agent with 500+ users. Passionate about DX and shipping fast."
                  />
                </div>

                <div className="onb-grid">
                  <div className="fl">
                    <label className="flb">LinkedIn <span className="opt">optional</span></label>
                    <input value={form.linkedin} onChange={e => update("linkedin", e.target.value)} placeholder="linkedin.com/in/..." />
                  </div>
                  <div className="fl">
                    <label className="flb">Portfolio / GitHub <span className="opt">optional</span></label>
                    <input value={form.portfolio} onChange={e => update("portfolio", e.target.value)} placeholder="github.com/... or your site" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="onb-ft">
            <button className="onb-back" disabled={step === 1} onClick={() => setStep(s => s - 1)}>
              ← Back
            </button>
            {step === 1 ? (
              <button className="onb-next" disabled={!step1Valid} onClick={() => setStep(2)}>
                Continue →
              </button>
            ) : (
              <button className="onb-next" disabled={saving} onClick={finish}>
                {saving ? <><span className="spin">⟳</span> Saving...</> : "Finish · Let's go 🚀"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
