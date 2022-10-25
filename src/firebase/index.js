// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7RBjuqhhEMTXmGwcSK6JDBgClk2Wu0gg",
    authDomain: "memento-demo-20c9c.firebaseapp.com",
    projectId: "memento-demo-20c9c",
    storageBucket: "memento-demo-20c9c.appspot.com",
    messagingSenderId: "909569251349",
    appId: "1:909569251349:web:6a3dc213272740a50d561c",
    measurementId: "G-SHFZ93BGBV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;