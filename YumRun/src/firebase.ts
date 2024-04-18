// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkueWUMdPd8r-jSuZIZNN0gKr5zcOiEEA",
  authDomain: "yumrun-6c523.firebaseapp.com",
  projectId: "yumrun-6c523",
  storageBucket: "yumrun-6c523.appspot.com",
  messagingSenderId: "207431544155",
  appId: "1:207431544155:web:ce81d907af381f67487e7e",
  measurementId: "G-NGG4RHR6WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);