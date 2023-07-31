// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARVvh_gvh-f8bZgc3ab9CHWmUd1heloOU",
  authDomain: "timekeeping-app-d39e6.firebaseapp.com",
  databaseURL: "https://timekeeping-app-d39e6-default-rtdb.firebaseio.com",
  projectId: "timekeeping-app-d39e6",
  storageBucket: "timekeeping-app-d39e6.appspot.com",
  messagingSenderId: "107284473847",
  appId: "1:107284473847:web:57290c4946e602439ab0f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, auth, database };