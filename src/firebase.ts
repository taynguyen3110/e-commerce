// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArY8j3Y0D6GaSVLljVt1qEa77cMUFRUsE",
  authDomain: "e-commerce-e6f2f.firebaseapp.com",
  projectId: "e-commerce-e6f2f",
  storageBucket: "e-commerce-e6f2f.appspot.com",
  messagingSenderId: "1002230791171",
  appId: "1:1002230791171:web:d258341ad1c635e5d7a236"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);