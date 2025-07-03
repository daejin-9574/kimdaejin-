
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoLoX11dVEOrGSJSUKZI6F23ep5DFZBo0",
  authDomain: "service-report-22d23.firebaseapp.com",
  projectId: "service-report-22d23",
  storageBucket: "service-report-22d23.appspot.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269",
  measurementId: "G-XYLJ1SS6PD"
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "report"));
    const text = document.getElementById("status-text");
    const dot = document.getElementById("status-dot");

    if (querySnapshot.size > 0) {
      text.innerHTML = "🟢 서버 연결 성공";
      dot.style.backgroundColor = "green";
    } else {
      text.innerHTML = "🟠 서버 연결 (데이터 없음)";
      dot.style.backgroundColor = "orange";
    }
  } catch (e) {
    const text = document.getElementById("status-text");
    const dot = document.getElementById("status-dot");
    text.innerHTML = "🔴 서버 연결 실패";
    dot.style.backgroundColor = "red";
    console.error("Firebase 연결 오류:", e);
  }
});

