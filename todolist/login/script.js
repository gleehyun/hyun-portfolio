const thisday = document.querySelector("#date");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

thisday.innerHTML = `오늘은 ${year}년 ${month}월 ${date}일 입니다.`;
