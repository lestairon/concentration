import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqp6h3M478xGTxf_fa5sqQHcuMjS0hqOc",
  authDomain: "concentration-64b0c.firebaseapp.com",
  databaseURL: "https://concentration-64b0c.firebaseio.com",
  projectId: "concentration-64b0c",
  storageBucket: "",
  messagingSenderId: "487946285632",
  appId: "1:487946285632:web:99ec7eef3a53e26a"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
