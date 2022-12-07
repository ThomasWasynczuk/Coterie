// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGFBWyN52gF0Ik3MaFMxaSXJrwuR8EBl0",
  authDomain: "coterie-437s.firebaseapp.com",
  projectId: "coterie-437s",
  storageBucket: "coterie-437s.appspot.com",
  messagingSenderId: "100061552631",
  appId: "1:100061552631:web:29e6038a292bb989dad8f2",
  measurementId: "G-ZRV4T9H1PS",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export default app;
export { db, storage, auth };
