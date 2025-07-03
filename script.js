
function checkFirebaseConnection() {
  try {
    firebase.firestore().collection("report").limit(1).get()
      .then(() => {
        document.getElementById("server-status").innerHTML =
          '<span style="color: green;">● 서버 연결 성공</span>';
      })
      .catch(() => {
        document.getElementById("server-status").innerHTML =
          '<span style="color: red;">● 서버 연결 실패</span>';
      });
  } catch (e) {
    document.getElementById("server-status").innerHTML =
      '<span style="color: red;">● 서버 연결 실패</span>';
  }
}

window.onload = function () {
  checkFirebaseConnection();
};
