// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyATc--kqSgJo7_WTEPhSpZk5ZC18q_GbGc",
  authDomain: "goldcups-limited.firebaseapp.com",
  projectId: "goldcups-limited",
  storageBucket: "goldcups-limited.firebasestorage.app",
  messagingSenderId: "452043533013",
  appId: "1:452043533013:web:e91691bfb74a66cf05105c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use in your app
export { auth, db, storage };
