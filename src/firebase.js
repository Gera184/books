import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC-lEaKLKz62dAUtrd_CKSeW3Qk0S5LPoY",
  authDomain: "auth-development-656d9.firebaseapp.com",
  projectId: "auth-development-656d9",
  storageBucket: "auth-development-656d9.appspot.com",
  messagingSenderId: "147084315702",
  appId: "1:147084315702:web:259734ddf170fe36895c97",
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
export default firebase;
