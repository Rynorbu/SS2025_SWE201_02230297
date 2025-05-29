import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHup_AprZk-IV-8ra7mKhgbV8_OZTsfxs",
  authDomain: "todo-list-7c60a.firebaseapp.com",
  projectId: "todo-list-7c60a",
  storageBucket: "todo-list-7c60a.firebasestorage.app",
  messagingSenderId: "212982899552",
  appId: "1:212982899552:web:9dc03ffba669459581b405",
  measurementId: "G-MGDBCJ4KJ8"
};



// Initialize Firebase app only once
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };


// const firebaseConfig = {
//   apiKey: "AIzaSyAHup_AprZk-IV-8ra7mKhgbV8_OZTsfxs",
//   authDomain: "todo-list-7c60a.firebaseapp.com",
//   projectId: "todo-list-7c60a",
//   storageBucket: "todo-list-7c60a.firebasestorage.app",
//   messagingSenderId: "212982899552",
//   appId: "1:212982899552:web:9dc03ffba669459581b405",
//   measurementId: "G-MGDBCJ4KJ8"
// };
