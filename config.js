import firebase from "firebase/compat/app";
// Other libraries might need to also be prefixed with "compat":
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyDiDSwkNNluWTztiYDZTUVXyZgLAcJppow",
  authDomain: "voice-4fdf2.firebaseapp.com",
  projectId: "voice-4fdf2",
  storageBucket: "voice-4fdf2.appspot.com",
  messagingSenderId: "1036206121702",
  appId: "1:1036206121702:web:6c2d06595cf6c1e0e69127"
};
// Then you can then use the old interface, with version 9:
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }