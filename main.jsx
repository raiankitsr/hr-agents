import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import HRAgent from "./hr-agent";
import AuthGate from "./AuthGate";

// Minimal storage polyfill for browser if window.storage isn't defined
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      const val = localStorage.getItem(key);
      return val ? { value: val } : undefined;
    },
    set: async (key, val) => localStorage.setItem(key, val),
  };
}

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return unsub;
  }, []);

  // Still checking auth state
  if (user === undefined) {
    return (
      <div style={{
        height: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#0d1117",
        fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#444c56"
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AuthGate onUser={setUser} />;
  }

  return <HRAgent user={user} onSignOut={() => signOut(auth)} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
