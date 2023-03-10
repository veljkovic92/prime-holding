// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP3v60J-HrZYSzkXKKQi1uICMqQB6Dr70",
  authDomain: "prime-holding-d0529.firebaseapp.com",
  projectId: "prime-holding-d0529",
  storageBucket: "prime-holding-d0529.appspot.com",
  messagingSenderId: "928923932440",
  appId: "1:928923932440:web:b64960d35c895d6cf7306d",
  databaseURL:
    "https://prime-holding-d0529-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
