const thisday = document.querySelector("#date");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

thisday.innerHTML = `${year}/${month}/${date}`;

const buttons = document.querySelectorAll(".plan");
const frames = document.querySelectorAll(".frames iframe");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {

    frames.forEach((frame, frameIndex) => {
      if (index === frameIndex) {
        frame.style.display = "block";
      } else {
        frame.style.display = "none";
      }
    });

    buttons.forEach((btn, btnIndex) => {
      if (index === btnIndex) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  });
});