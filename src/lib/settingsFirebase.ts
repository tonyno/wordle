// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVtGKbVcXna2SapvfDxNpEVSdRo8Obh8",
  authDomain: "wordle-cz.firebaseapp.com",
  databaseURL:
    "https://wordle-cz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wordle-cz",
  storageBucket: "wordle-cz.appspot.com",
  messagingSenderId: "474314331888",
  appId: "1:474314331888:web:cbd92dea27ef201eb51435",
  measurementId: "G-KHXNCX047H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

export const logMyEvent = (event: string, eventParam: string = "") => {
  logEvent(analytics, event, { param1: eventParam });
};
