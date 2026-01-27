// Firebase configuration and initialization
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBy6mLQAokpnz2AmgwTrzka0qer5Ga_Oo",
  authDomain: "mood-fit-app.firebaseapp.com",
  projectId: "mood-fit-app",
  storageBucket: "mood-fit-app.firebasestorage.app",
  messagingSenderId: "256781614227",
  appId: "1:256781614227:web:d850dddea2fc0ea5e86166",
  measurementId: "G-D9S7V89Z2G"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Server-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, analytics, auth, db };

