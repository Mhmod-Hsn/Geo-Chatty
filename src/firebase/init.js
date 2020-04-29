import firebase from 'firebase'
import firestore from '@firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDD93m7Lq7_r_5aMmMkUtTHaZnRt8KgpjI",
  authDomain: "geo-chatty.firebaseapp.com",
  databaseURL: "https://geo-chatty.firebaseio.com",
  projectId: "geo-chatty",
  storageBucket: "geo-chatty.appspot.com",
  messagingSenderId: "253289794322",
  appId: "1:253289794322:web:f675ead55ab9e23e87c1cb"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default firebaseApp.firestore()