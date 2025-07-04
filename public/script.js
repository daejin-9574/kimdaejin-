
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-init.js";

document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("server-status");
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const snapshot = await getDocs(collection(db, "report"));
    if (snapshot.empty) {
      statusEl.innerHTML = "🟠 서버 연결 (데이터 없음)";
    } else {
      statusEl.innerHTML = "🟢 서버 연결 성공";
    }
  } catch (e) {
    statusEl.innerHTML = "🔴 서버 연결 실패";
    console.error("연결 오류:", e);
  }
});
