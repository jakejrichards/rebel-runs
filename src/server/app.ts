import express from "express";
import firebase from "firebase";

const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyBRnVWBb0gzc1ZmxOUXWe_k6VqfnayhfCI",
  authDomain: "rebelruns-f0966.firebaseapp.com",
  databaseURL: "https://rebelruns-f0966.firebaseio.com",
  projectId: "rebelruns-f0966",
  storageBucket: "rebelruns-f0966.appspot.com",
  messagingSenderId: "302383393254"
};

firebase.initializeApp(firebaseConfig);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server is listening on port 3000"));
