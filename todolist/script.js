const thisday = document.querySelector("#date");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

thisday.innerHTML = `${year}/${month}/${date}`;
