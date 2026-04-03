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
  appId: "1:1081751091895:web:d5f50e2f5a88f084b96b32"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
