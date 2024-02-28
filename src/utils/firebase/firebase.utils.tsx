// import from SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFLUPrfBBkFSaZYdAANokV8FrZjbX67Jg",
  authDomain: "pgs-personalgolfscore.firebaseapp.com",
  projectId: "pgs-personalgolfscore",
  storageBucket: "pgs-personalgolfscore.appspot.com",
  messagingSenderId: "26033768355",
  appId: "1:26033768355:web:bd6a43dc19affbfdc0bc16",
  measurementId: "G-2GPMKQTCWM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);