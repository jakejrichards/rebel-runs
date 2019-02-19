import bodyParser from 'body-parser';
import cors from 'cors';
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

app.use(bodyParser.json());
app.use(cors());

app.post("/new_user", (req, res) => {
  console.log(req.body);
  const { email, name } = req.body;
  const account = {
    name,
    email,
  }
  return firebase.firestore().collection('accounts').add(account).then(() => ({
    message: 'Account created successfully!',
  }))
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server is listening on port 3000"));
