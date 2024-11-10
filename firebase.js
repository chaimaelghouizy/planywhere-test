// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV91JKLPDkn4BjjCe3RRXtP1jz_41C8-M",
  authDomain: "login-fefa8.firebaseapp.com",
  projectId: "login-fefa8",
  storageBucket: "login-fefa8.appspot.com",
  messagingSenderId: "322272181475",
  appId: "1:322272181475:web:9303e63fa5c70b1d3ed9d6",
  measurementId: "G-BKCLZ89N2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth=getAuth(app)
export {auth, app}