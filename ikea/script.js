// json ===========================
const jsonFile = "./ikea.json";

async function init() {
  const response = await fetch(jsonFile);
  const ikeaJsons = await response.json();
  display(ikeaJsons);
}
function display(ikeaJsons) {
  // sec1 slider.bestcategory=================
  const sec1Slider = document.querySelector(".sec1_slider");

  let sec1Bestitems = "";
  ikeaJsons.bestCategory.forEach((ikeaJson) => {
    sec1Bestitems += `
    <li class="sec1_best_item">
      <img src="${ikeaJson.bestImg}" alt="${ikeaJson.bestAlt}"/>
      <p class"sec1_best_name">${ikeaJson.bestText}</p>
    </li>
    `;
  });
  sec1Slider.innerHTML = sec1Bestitems;
}
init();
