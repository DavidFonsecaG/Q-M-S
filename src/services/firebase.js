import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database'; // Import database module from compat namespace

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); //Auth
const db = firebase.firestore(); //Firestore
const database = firebase.database(); //Realtime Database
const storage = firebase.storage(); //Storage
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //Google Auth

export {
  auth,
  db,
  database,
  storage,
  googleAuthProvider
};

export default firebase;
