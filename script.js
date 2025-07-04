
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
function searchReports() {
  // 예시 동작
  console.log("검색 실행!");
  // 서버에서 리포트 데이터를 가져오는 코드
}

});
