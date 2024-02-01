// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvNfVr94nN6KHgmnWvxLM4ZF7UKtIdfUo",
  authDomain: "expense-tracker-815a9.firebaseapp.com",
  projectId: "expense-tracker-815a9",
  storageBucket: "expense-tracker-815a9.appspot.com",
  messagingSenderId: "815472037024",
  appId: "1:815472037024:web:6d92f006920b90c0fe4dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);