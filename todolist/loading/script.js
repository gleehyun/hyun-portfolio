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
