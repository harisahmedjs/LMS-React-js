import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FirebaseConfig = {
    apiKey: 'AIzaSyDtjmVaRNnxwg5d925iX1Z8rLZuEBU6gjQ',
    authDomain: 'learning-institute-management.firebaseapp.com',
    projectId: "learning-institute-management",
    storageBucket: 'learning-institute-management.appspot.com' ,
    messagingSenderId: '135800963381',
    appId: '1:135800963381:web:a8a349875b747ac129cc7c',
    measurementId: 'G-P1G7WN5LFZ'
  };

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app