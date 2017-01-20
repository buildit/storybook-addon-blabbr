// Initialize Firebase
import * as firebase from "firebase";

var config = {
  "apiKey": "AIzaSyCZ-edNRbLIigWheJTmqwXpGUXFPabF5M0",
  "authDomain": "comments-c8e4c.firebaseapp.com",
  "databaseURL": "https://comments-c8e4c.firebaseio.com",
  "storageBucket": "comments-c8e4c.appspot.com",
  "messagingSenderId": "574115914803"
};
firebase.initializeApp(config);

var db = firebase.database();
export default db;
