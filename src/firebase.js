import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAzoKRZOcP-lqJUWF6l4p3BIswj_S-zxE",
  authDomain: "react-jobs-app-21f67.firebaseapp.com",
  projectId: "react-jobs-app-21f67",
  storageBucket: "react-jobs-app-21f67.firebasestorage.app",
  messagingSenderId: "826809909374",
  appId: "1:826809909374:web:09d06026501ed56eef982f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
