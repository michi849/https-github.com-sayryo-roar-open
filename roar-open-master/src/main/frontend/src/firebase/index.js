import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const FirebaseTimestamp = firebase.firestore.Timestamp();
