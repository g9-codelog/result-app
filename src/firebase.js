import { getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_BASIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_BASIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_BASIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_BASIC_STORONG_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_BASIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_BASIC_APP_ID,
};

let auth;
let db;

if (typeof window !== "undefined" && !getApps().length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore(app);
}

export { db, auth };
