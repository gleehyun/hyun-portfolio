const thisday = document.querySelector("#date");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

thisday.innerHTML = `오늘은 ${year}년 ${month}월 ${date}일 입니다.`;



setTimeout(function () {
    const loginPage = document.querySelector(".login_page");
    loginPage.style.opacity = "1";
    loginPage.style.visibility = "visible";
}, 3000);

function setLogin() {
    var id = document.getElementById("id").value;
    var pw = document.getElementById("pw").value;

    if (id === "") {
      alert("아이디를 입력해주세요.");
    } else if (pw === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      alert("오늘도 열심히! 멋진 하루 되세요. 😊");
    }
  }