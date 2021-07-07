import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBkSD4gpOKTo86gwnJPHbYI657v4xq7QIs",
  authDomain: "react-app-curso-7aa9d.firebaseapp.com",
  databaseURL: "https://react-app-curso-7aa9d.firebaseio.com",
  projectId: "react-app-curso-7aa9d",
  storageBucket: "react-app-curso-7aa9d.appspot.com",
  messagingSenderId: "397123290856",
  appId: "1:397123290856:web:f3041b6a26daf64a9eeb5d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}