// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4CcvriWWG0mZ2ZEfc9-3cfc8gcbnCRNI",
  authDomain: "crud-twitter.firebaseapp.com",
  projectId: "crud-twitter",
  storageBucket: "crud-twitter.appspot.com",
  messagingSenderId: "765687110584",
  appId: "1:765687110584:web:cb034e1700c0546f114d4d"
};
// 자동으로 firebaseConfig에 있는 것들을 생성해준다. 

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC4CcvriWWG0mZ2ZEfc9-3cfc8gcbnCRNI",
//   authDomain: "crud-twitter.firebaseapp.com",
//   projectId: "crud-twitter",
//   storageBucket: "crud-twitter.appspot.com",
//   messagingSenderId: "765687110584",
//   appId: "1:765687110584:web:cb034e1700c0546f114d4d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);