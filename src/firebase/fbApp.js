import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDUzGJDsWsnZHJmxMG1FNfyr_VRxBxch0Y",
    authDomain: "haven-117c1.firebaseapp.com",
    databaseURL: "https://haven-117c1.firebaseio.com",
    storageBucket: "haven-117c1.appspot.com",
    messagingSenderId: "799443460782"
 };


 const firebaseApp2 = firebase.initializeApp(firebaseConfig);
 console.log("FIREBASE CONFIG SET");

 module.exports = firebaseApp2;