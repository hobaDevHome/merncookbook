import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "firebase/auth";

let key = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyCoRf0nn5q8EH8oSRC0MGHH3kkwqFoT6Og",
  authDomain: "sarhan-redux.firebaseapp.com",
  databaseURL: "https://sarhan-redux-default-rtdb.firebaseio.com",
  projectId: "sarhan-redux",
  storageBucket: "sarhan-redux.appspot.com",
  messagingSenderId: "93036002516",
  appId: "1:93036002516:web:f8da8011ed0cc492358f41",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
