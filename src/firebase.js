import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyCguOWJrGXHExNtOB9z30C0_uctYxilzeU",
  authDomain: "learningdashboard-3f398.firebaseapp.com",
  databaseURL:
    "https://learningdashboard-3f398-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learningdashboard-3f398",
  storageBucket: "learningdashboard-3f398.appspot.com",
  messagingSenderId: "1014486114904",
  appId: "1:1014486114904:web:72321b8555be689872e02d",
  measurementId: "G-ZPZLN46GSM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const provider2 = new FacebookAuthProvider();
export { db, auth, provider, provider2 };
