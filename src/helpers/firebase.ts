import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7aV4tCPDBderYS_BEQDrluzGoH_TelwM",
  authDomain: "social-e-22a17.firebaseapp.com",
  projectId: "social-e-22a17",
  storageBucket: "social-e-22a17.appspot.com",
  messagingSenderId: "229200187024",
  appId: "1:229200187024:web:65a1bb7fafc66f3a529215",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
