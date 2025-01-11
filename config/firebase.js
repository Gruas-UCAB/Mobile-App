import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDwYcsrqSj9ELYgSbiovgKjhhr_r9NkK_M",
    authDomain: "gruas-ucab-620ae.firebaseapp.com",
    projectId: "gruas-ucab-620ae",
    storageBucket: "gruas-ucab-620ae.firebasestorage.app",
    messagingSenderId: "227790155172",
    appId: "1:227790155172:web:deacd67bf8d37aab156531",
    measurementId: "G-92HB4HEMTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };