// https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA1hWr0dPtob3fLTL250pzawdCe0Rx0NFM',
  authDomain: 'smartbin-c93c9.firebaseapp.com',
  databaseURL: 'https://smartbin-c93c9-default-rtdb.firebaseio.com',
  projectId: 'smartbin-c93c9',
  storageBucket: 'smartbin-c93c9.appspot.com',
  messagingSenderId: '471127943920',
  appId: '1:471127943920:web:4ba8c8d5d200974751b035',
  measurementId: 'G-Y0E9RW1LJ1',
};

const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export { firebaseDB };

// --------------------------------------------------------------------------
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA1hWr0dPtob3fLTL250pzawdCe0Rx0NFM",
//   authDomain: "smartbin-c93c9.firebaseapp.com",
//   databaseURL: "https://smartbin-c93c9-default-rtdb.firebaseio.com",
//   projectId: "smartbin-c93c9",
//   storageBucket: "smartbin-c93c9.appspot.com",
//   messagingSenderId: "471127943920",
//   appId: "1:471127943920:web:4ba8c8d5d200974751b035",
//   measurementId: "G-Y0E9RW1LJ1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
