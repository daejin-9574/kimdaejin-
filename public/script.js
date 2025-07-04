
// script.js
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const db = window.db;
    const snapshot = await getDocs(collection(db, "report"));
    document.getElementById("serverStatus").textContent = "🟢 서버 연결 성공";
    renderReports(snapshot);
  } catch (error) {
    document.getElementById("serverStatus").textContent = "🔴 서버 연결 실패";
    console.error("연결 실패:", error);
  }
});

window.searchReports = async function () {
  const db = window.db;
  const client = document.getElementById("searchClient").value.trim();
  const from = document.getElementById("searchDateFrom").value;
  const to = document.getElementById("searchDateTo").value;

  let q = collection(db, "report");
  let docsSnap = await getDocs(q);

  let filtered = [];
  docsSnap.forEach(doc => {
    const d = doc.data();
    if ((!client || d.client.includes(client)) &&
        (!from || d.date >= from) &&
        (!to || d.date <= to)) {
      filtered.push(d);
    }
  });

  renderReports({ docs: filtered.map(data => ({ data: () => data })) });
};

function renderReports(snapshot) {
  const body = document.getElementById("reportTableBody");
  body.innerHTML = "";
  snapshot.docs.forEach(doc => {
    const d = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border px-2 py-1">${d.date}</td>
      <td class="border px-2 py-1">${d.client}</td>
      <td class="border px-2 py-1">${d.problem}</td>
      <td class="border px-2 py-1">${d.solution}</td>
      <td class="border px-2 py-1"><button class="text-blue-600">보기</button></td>
    `;
    body.appendChild(tr);
  });
}
