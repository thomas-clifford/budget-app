import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMF_2ntihf9wRudtFy4jOPaU4p8Bio2vY",
    authDomain: "budget-app-9fb29.firebaseapp.com",
    projectId: "budget-app-9fb29",
    storageBucket: "budget-app-9fb29.appspot.com",
    messagingSenderId: "943349803469",
    appId: "1:943349803469:web:6bbbbf871aaaea7ce2fc84"
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
