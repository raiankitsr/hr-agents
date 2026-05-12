// firebase.js — Initialize Firebase
// Replace the placeholder values below with your Firebase project config.
// Get it from: Firebase Console → Project Settings → Your Apps → Web App → Config

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTOReotm3pvZGArebFpD3c5nMf-lIbea0",
  authDomain: "hr-agents-24317.firebaseapp.com",
  projectId: "hr-agents-24317",
  storageBucket: "hr-agents-24317.firebasestorage.app",
  messagingSenderId: "1081751091895",
  appId: "1:1081751091895:web:d5f50e2f5a88f084b96b32",
  measurementId: "G-0DVTHDMCXW"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Request gmail.readonly so we can scan recipient replies in the History tab.
// User sees a "Read your Gmail" consent prompt on first sign-in.
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/gmail.readonly");
googleProvider.setCustomParameters({ prompt: "select_account" });
