import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { app } from "./firebase-init.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
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
});
