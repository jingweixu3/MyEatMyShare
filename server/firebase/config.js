// import * as firebase from "firebase/app";
// import "firebase/storage";
// import "firebase/firestore";

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/storage");
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPr-IE3RRFblsRN9T_Q8fv3hRkpblWwY",
  authDomain: "myeatmyshare.firebaseapp.com",
  projectId: "myeatmyshare",
  storageBucket: "myeatmyshare.appspot.com",
  messagingSenderId: "584759162528",
  appId: "1:584759162528:web:9806243bd9a7a9060cfbc5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const filedValue = firebase.firestore.FieldValue;

module.exports = { projectStorage, projectFirestore, timestamp,  filedValue};
