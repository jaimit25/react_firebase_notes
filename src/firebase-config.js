//old method
import firebase from 'firebase'
// https://websitefirebase-ca9f3.firebaseio.com",

const firebaseApp = firebase.initializeApp({
//add configs
});

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();

export { db, auth,storage }

//new method
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
// // import firebase from 'firebase';
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   databaseURL: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const db = getFirestore(app);
