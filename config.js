import firebase from "firebase/compat/app";
// Other libraries might need to also be prefixed with "compat":
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const firebaseConfig = {
   apiKey: "AIzaSyB9p1bSap4jvYhIOCqtcjsqYObm7Edl5jI",
    authDomain: "journal-voice-e75e4.firebaseapp.com",
    projectId: "journal-voice-e75e4",
    storageBucket: "journal-voice-e75e4.appspot.com",
    messagingSenderId: "325672943920",
    appId: "1:325672943920:web:9eb714952bd081eb2808f5"
};
// Then you can then use the old interface, with version 9:
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }