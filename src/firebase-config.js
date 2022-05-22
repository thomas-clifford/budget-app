import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import config from "../config"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
  };

// Initialize the connection to Firebase
firebase.initializeApp(firebaseConfig);

// Utils
const AUTH = firebase.auth();
const DB = firebase.firestore();

// Firestore Collections
const USERS = DB.collection("Users");

// Export the firebase tools
export {
    AUTH,
    USERS
}
