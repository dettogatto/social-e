import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu0GrvcJVKAg2_w-r_DSmDuljMjS4lmRw",
  authDomain: "carrara-social-e.firebaseapp.com",
  projectId: "carrara-social-e",
  storageBucket: "carrara-social-e.appspot.com",
  messagingSenderId: "220197134801",
  appId: "1:220197134801:web:b037857caddda977a6c0f0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
