import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_M_ID,
  apiKey: "AIzaSyC3HNX9Ft9-AHlzBLYjBQhmhlT58RVBEms",
  authDomain: "ts-todo-9ad2f.firebaseapp.com",
  projectId: "ts-todo-9ad2f",
  databaseURL: "https://ts-todo-9ad2f.firebaseio.com",
  storageBucket: "ts-todo-9ad2f.appspot.com",
  messagingSenderId: "697786736368",
  appId: "1:697786736368:web:7a91d96ca837427c7eac35",
  measurementId: "G-C6RVV720FY",
});

export const db = firebase.firestore();
export const auth = firebase.auth();
