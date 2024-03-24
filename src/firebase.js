import { getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkZU1ADCI3h0R-FxE9uZGZJHJYViOROFo",
  authDomain: "result-app-d6477.firebaseapp.com",
  projectId: "result-app-d6477",
  storageBucket: "result-app-d6477.appspot.com",
  messagingSenderId: "686744739329",
  appId: "1:686744739329:web:c7498ce02162ba9a542a00",
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, auth };
