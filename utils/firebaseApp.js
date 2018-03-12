import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDLf8xWjwdRqaUmdIBqsxw1PFlg8vXaym8",
  authDomain: "gouglenc.firebaseapp.com",
  databaseURL: "https://my-project-1496189527259.firebaseio.com/"
};

var app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default app;
