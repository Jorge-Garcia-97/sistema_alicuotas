import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tutorial-3ff7c.firebaseapp.com",
  projectId: "tutorial-3ff7c",
  storageBucket: "tutorial-3ff7c.appspot.com",
  messagingSenderId: "827754816157",
  appId: "1:827754816157:web:24bc9569ede1e8ca7f6a74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);