
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.getElementById("report-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const parts = [];
  document.querySelectorAll("#part-rows tr").forEach(row => {
    const inputs = row.querySelectorAll("input");
    parts.push({
      partNo: inputs[0].value,
      name: inputs[1].value,
      qty: inputs[2].value,
      price: inputs[3].value,
    });
  });
  data.parts = parts;
  try {
    await addDoc(collection(db, "reports"), data);
    alert("저장되었습니다.");
  } catch (err) {
    console.error("저장 실패", err);
  }
});

// 서명 관련
let currentSigTarget = null;
const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

document.getElementById("clear-signature").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("cancel-signature").onclick = () => {
  document.getElementById("signature-modal").classList.add("hidden");
};

document.getElementById("save-signature").onclick = () => {
  const dataURL = canvas.toDataURL();
  alert("서명 저장됨 (개발 중 - 실제 적용은 추후)");
  document.getElementById("signature-modal").classList.add("hidden");
};

window.sign = function(who) {
  currentSigTarget = who;
  document.getElementById("signature-modal").classList.remove("hidden");
};

document.querySelector("button:contains('PDF 저장')")?.addEventListener("click", () => {
  import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(jsPDFModule => {
    import('https://html2canvas.hertzen.com/dist/html2canvas.min.js').then(() => {
      const { jsPDF } = jsPDFModule;
      html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("service_report.pdf");
      });
    });
  });
});

document.getElementById("pdf-button")?.addEventListener("click", () => {
  import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(jsPDFModule => {
    import('https://html2canvas.hertzen.com/dist/html2canvas.min.js').then(() => {
      const { jsPDF } = jsPDFModule;

      const techSign = window.techSign || "";
      const clientSign = window.clientSign || "";

      html2canvas(document.querySelector("form")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);

        if (techSign) pdf.addImage(techSign, 'PNG', 20, height - 30, 50, 20);
        if (clientSign) pdf.addImage(clientSign, 'PNG', 120, height - 30, 50, 20);

        pdf.save("service_report_with_sign.pdf");
      });
    });
  });
});

document.getElementById("save-signature").onclick = () => {
  const dataURL = canvas.toDataURL();
  if (currentSigTarget === 'tech') window.techSign = dataURL;
  else if (currentSigTarget === 'client') window.clientSign = dataURL;
  alert("서명이 저장되었습니다.");
  document.getElementById("signature-modal").classList.add("hidden");
};

document.querySelector("button:contains('PDF 저장')")?.addEventListener("click", () => {
  import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(jsPDFModule => {
    import('https://html2canvas.hertzen.com/dist/html2canvas.min.js').then(() => {
      const { jsPDF } = jsPDFModule;

      html2canvas(document.querySelector("form")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        document.getElementById("pdf-preview-img").src = imgData;
        document.getElementById("pdf-preview-modal").classList.remove("hidden");

        const techSign = window.techSign || "";
        const clientSign = window.clientSign || "";

        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);

        if (techSign) pdf.addImage(techSign, 'PNG', 20, height - 30, 50, 20);
        if (clientSign) pdf.addImage(clientSign, 'PNG', 120, height - 30, 50, 20);

        window.generatedPDF = pdf;
      });
    });
  });
});

// 서버 연결 상태 확인
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const dbStatus = getFirestore();

(async () => {
  try {
    document.getElementById("status-dot").style.backgroundColor = "yellow";
    document.getElementById("status-text").textContent = "서버 연결 중...";
    await dbStatus.app;
    document.getElementById("status-dot").style.backgroundColor = "green";
    document.getElementById("status-text").textContent = "서버 연결 성공";
  } catch (e) {
    document.getElementById("status-dot").style.backgroundColor = "red";
    document.getElementById("status-text").textContent = "서버 연결 실패";
  }
})();

function downloadReports() {
  const rows = Array.from(document.querySelectorAll("#report-list tr"));
  let csv = "작성일,고객사,고장현상,조치사항\n";
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const data = Array.from(cells).slice(0, 4).map(td => td.innerText.replace(/,/g, " ")).join(",");
    csv += data + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "reports.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function isDateInRange(dateStr, from, to) {
  if (!from && !to) return true;
  const d = new Date(dateStr);
  if (from && d < new Date(from)) return false;
  if (to && d > new Date(to)) return false;
  return true;
}

async function loadReports(filterCompany = '', from = '', to = '') {
  const q = collection(db, "reports");
  const snapshot = await getDocs(q);
  const tbody = document.getElementById("report-list");
  tbody.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    if ((filterCompany && !data.고객사?.includes(filterCompany)) ||
        (data.작성일 && !isDateInRange(data.작성일, from, to))) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border p-2">${data.작성일 || ""}</td>
      <td class="border p-2">${data.고객사 || ""}</td>
      <td class="border p-2">${(data.고장현상 || "").substring(0, 20)}</td>
      <td class="border p-2">${(data.조치사항 || "").substring(0, 20)}</td>
      <td class="border p-2"><button class="text-blue-600 underline" onclick='showDetails(${JSON.stringify(data)})'>자세히</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function searchReports() {
  const company = document.getElementById("search-company").value;
  const from = document.getElementById("search-from").value;
  const to = document.getElementById("search-to").value;
  loadReports(company, from, to);
}
