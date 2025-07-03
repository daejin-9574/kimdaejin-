import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoLoX11dVEOrGSJSUKZI6F23ep5DFZBo0",
  authDomain: "service-reports-22d23.firebaseapp.com",
  projectId: "service-reports-22d23",
  storageBucket: "service-reports-22d23.appspot.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269",
  measurementId: "G-XYLJ1SS6PD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    const statusEl = document.getElementById("server-status");
    if (querySnapshot.size > 0) {
      statusEl.innerHTML = "🟢 서버 연결 성공";
    } else {
      statusEl.innerHTML = "🟠 서버 연결 (데이터 없음)";
    }
  } catch (e) {
    const statusEl = document.getElementById("server-status");
    statusEl.innerHTML = "🔴 서버 연결 실패";
    console.error("Firebase 연결 오류:", e);
  }
});
