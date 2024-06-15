import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore , getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({   
    prompt : "select_account "
});

export const auth = getAuth();
export const db = getFirestore(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const firestoreFunctions = {
  getDocs,
  collection,
};