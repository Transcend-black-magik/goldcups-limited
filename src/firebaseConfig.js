// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config object
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdotw-er4FPsK07zUTDn4As-T_R14lqQ4",
  authDomain: "goldcupslimited.firebaseapp.com",
  projectId: "goldcupslimited",
  storageBucket: "goldcupslimited.firebasestorage.app",
  messagingSenderId: "47754139745",
  appId: "1:47754139745:web:15524e9c7e3b27ac19f220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use in your app
export { auth, db, storage };
