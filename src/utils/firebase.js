// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5EFAdEpAbMfPJRugpvtKALhOvSGvz6Js",
  authDomain: "chat-react-app-feb57.firebaseapp.com",
  databaseURL: "https://chat-react-app-feb57-default-rtdb.firebaseio.com",
  projectId: "chat-react-app-feb57",
  storageBucket: "chat-react-app-feb57.appspot.com",
  messagingSenderId: "429107042297",
  appId: "1:429107042297:web:3ceb2e17fbaae928608f28",
  measurementId: "G-5F221241YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);