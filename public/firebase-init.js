
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyA3KtmfxaUEFTCeTfGYGNfR3tK-XJp9x1I",
  authDomain: "service-report-22d23.firebaseapp.com",
  projectId: "service-report-22d23",
  storageBucket: "service-report-22d23.firebaseapp.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
