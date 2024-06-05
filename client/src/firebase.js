// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a6525.firebaseapp.com",
  projectId: "mern-blog-a6525",
  storageBucket: "mern-blog-a6525.appspot.com",
  messagingSenderId: "1020920502871",
  appId: "1:1020920502871:web:f4ba5c91cfdfff0f646112",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
