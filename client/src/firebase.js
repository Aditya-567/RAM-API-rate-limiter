// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"; // Import Firebase Analytics if needed
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore if needed

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY3ztNjINZhtZ_4z14jCJ3Bx0ICZRdMiA",
    authDomain: "api-rate-b159d.firebaseapp.com",
    projectId: "api-rate-b159d",
    storageBucket: "api-rate-b159d.appspot.com",
    messagingSenderId: "361053640975",
    appId: "1:361053640975:web:94d5b8906439d15bec867a",
    measurementId: "G-611PDKRKMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the database service
export const db = getFirestore(app);

// You can now import `auth` and `db` in your components to use Firebase Authentication and Firestore.
