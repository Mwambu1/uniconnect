// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfl89NfA-4pGenoDhU_ZrO-oSfsZILCZQ",
  authDomain: "uniconnect-55951.firebaseapp.com",
  projectId: "uniconnect-55951",
  storageBucket: "uniconnect-55951.appspot.com",
  messagingSenderId: "689069372226",
  appId: "1:689069372226:web:e849f8ab86baf3d424cedb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };