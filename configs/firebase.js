// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAykXhcqnXjaM4o8rNYZtYlWIADoK6JkWc",
  authDomain: "next-chat-583ff.firebaseapp.com",
  projectId: "next-chat-583ff",
  storageBucket: "next-chat-583ff.appspot.com",
  messagingSenderId: "1031554488976",
  appId: "1:1031554488976:web:6c5103b6024364b050d615",
  measurementId: "G-5ZYQZPPGJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
