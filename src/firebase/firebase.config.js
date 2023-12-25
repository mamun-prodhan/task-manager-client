// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDYa9wQbXhrsc7gYGMnfUk-TFCoI1yJn0",
  authDomain: "task-manager-scic.firebaseapp.com",
  projectId: "task-manager-scic",
  storageBucket: "task-manager-scic.appspot.com",
  messagingSenderId: "251195325112",
  appId: "1:251195325112:web:2339da2e865fabf1d6524d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
