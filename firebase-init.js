import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoLoX11dVEOrGSJSUKZI6F23ep5DFZBo0",
  authDomain: "service-report-22d23.firebaseapp.com",
  projectId: "service-report-22d23",
  storageBucket: "service-report-22d23.firebasestorage.app",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269",
  measurementId: "G-XYLJ1SS6PD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
