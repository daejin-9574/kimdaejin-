
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from "./firebase-init.js";

window.searchReports = async function () {
  const tbody = document.getElementById("reportTableBody");
  tbody.innerHTML = "<tr><td colspan='5' class='text-center py-2'>데이터를 불러오는 중...</td></tr>";

  const customer = document.getElementById("searchCustomer").value.trim();
  const startDate = document.getElementById("searchStartDate").value;
  const endDate = document.getElementById("searchEndDate").value;

  let q = collection(db, "report");
  let conditions = [];

  if (customer) conditions.push(where("고객사", "==", customer));
  if (startDate) conditions.push(where("작성일", ">=", startDate));
  if (endDate) conditions.push(where("작성일", "<=", endDate));

  if (conditions.length > 0) {
    q = query(q, ...conditions);
  }

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    tbody.innerHTML = "<tr><td colspan='5' class='text-center py-2'>검색된 데이터가 없습니다.</td></tr>";
    return;
  }

  tbody.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border px-2 py-1">${data["작성일"] || ""}</td>
      <td class="border px-2 py-1">${data["고객사"] || ""}</td>
      <td class="border px-2 py-1">${data["고장현상"] || ""}</td>
      <td class="border px-2 py-1">${data["조치사항"] || ""}</td>
      <td class="border px-2 py-1"><a href="#" class="text-blue-600 hover:underline">보기</a></td>
    `;
    tbody.appendChild(tr);
  });
};
