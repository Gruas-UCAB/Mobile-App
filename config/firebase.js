// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTs-ysGcSiHW6lvY9FfUjTRfnSGnbw76g",
  authDomain: "gruas-ucab-app.firebaseapp.com",
  projectId: "gruas-ucab-app",
  storageBucket: "gruas-ucab-app.firebasestorage.app",
  messagingSenderId: "458909469555",
  appId: "1:458909469555:web:9e0ff4d3348db76e5ad306",
  measurementId: "G-C0P97EKP4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);