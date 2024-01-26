import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZFpnWFvGPdPupElGs0GS_7bCF7NNnan0",
    authDomain: "voiture-13909.firebaseapp.com",
    projectId: "voiture-13909",
    storageBucket: "voiture-13909.appspot.com",
    messagingSenderId: "349263675520",
    appId: "1:349263675520:web:231c9b40e1d2aa2a9f2665",
    measurementId: "G-TNH7F9GRRJ"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase }