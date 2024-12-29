// import from SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase configuration
// const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
// const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
// const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
// const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
// const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
// const appId = process.env.REACT_APP_FIREBASE_APP_ID;
// const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {

  apiKey: 'AIzaSyDFLUPrfBBkFSaZYdAANokV8FrZjbX67Jg',
  authDomain: 'pgs-personalgolfscore.firebaseapp.com',
  projectId: 'pgs-personalgolfscore',
  storageBucket: 'pgs-personalgolfscore.appspot.com',
  messagingSenderId: '26033768355',
  appId: '1:26033768355:web:bd6a43dc19affbfdc0bc16',
  measurementId: 'G-2GPMKQTCWM',

  // apiKey: apiKey,
  // authDomain: authDomain,
  // projectId: projectId,
  // storageBucket: storageBucket,
  // messagingSenderId: messagingSenderId,
  // appId: appId,
  // measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);