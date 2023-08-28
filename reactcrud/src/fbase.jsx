// firebase 9.6.1 버전을 사용

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID
};
// 자동으로 설정을 셋팅해준다.

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();



// // firebase 9버전 이상
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY ,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const authService = getAuth(app);



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