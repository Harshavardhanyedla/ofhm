import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASDHTDZKfI0E4Mn_v7YcbtHius_2SyZys",
    authDomain: "ofhm-5e083.firebaseapp.com",
    projectId: "ofhm-5e083",
    storageBucket: "ofhm-5e083.firebasestorage.app",
    messagingSenderId: "88784577587",
    appId: "1:88784577587:web:2f84cb047eab15405b6f46",
    measurementId: "G-4DKJDWMTCY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
