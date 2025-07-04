
// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuzO9uD6KzthLDlhrFpnfHDdjUqJj7nB4",
  authDomain: "service-report-22d23.firebaseapp.com",
  projectId: "service-report-22d23",
  storageBucket: "service-report-22d23.appspot.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
