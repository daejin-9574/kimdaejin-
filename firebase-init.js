
// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA3KtmfxaUEFTCeTfGYGNfR3tK-XJp9x1I",
  authDomain: "bitekps-report-mail-server.firebaseapp.com",
  projectId: "bitekps-report-mail-server",
  storageBucket: "bitekps-report-mail-server.appspot.com",
  messagingSenderId: "467709604044",
  appId: "1:467709604044:web:82be6d0de9289cfd3b9269"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
