
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3KtmfxaUEFTCeTfGYGNfR3tK-XJp9x1I",
  authDomain: "bitekps-report-mail-server.firebaseapp.com",
  projectId: "bitekps-report-mail-server",
  storageBucket: "bitekps-report-mail-server.appspot.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
