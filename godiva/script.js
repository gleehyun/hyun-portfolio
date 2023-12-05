// json===================================================================
const jsonFile = "./godiva.json";

async function init() {
  const response = await fetch(jsonFile);
  const godivaJsons = await response.json();
  display(godivaJsons);
}
// header=============================================
//navLeft========================
function display(godivaJsons) {
  const navsLeft = document.querySelector("#nav_left");
  let navsLeftEl = "";
  godivaJsons.navs_Left.forEach((godivaJson) => {
    navsLeftEl += `
        <li><a href="#">${godivaJson.navLeft}</a></li>
        `;
  });
  navsLeft.innerHTML = navsLeftEl;
  //navRight========================
  const navsRight = document.querySelector("#nav_right");
  let navsRightEl = "";
  godivaJsons.navs_Right.forEach((godivaJson) => {
    navsRightEl += `
        <li><a href="#">${godivaJson.navRight}</a></li>
        `;
  });
  navsRight.innerHTML = navsRightEl;

  //navMain========================
  const navsMain = document.querySelector("#nav_main");
  let navsMainEl = "";
  godivaJsons.navs_Main.forEach((godivaJson) => {
    navsMainEl += `
        <li><a href="#">${godivaJson.navMain}</a></li>
        `;
  });
  navsMain.innerHTML = navsMainEl;

  // section2=============================================
  //sec2Top========================
  const section2ItemsTop = document.querySelector(".section2_items_top");
  const section2ItemsTopUl = document.createElement("ul");
  let sec2TopItems = "";
  godivaJsons.section2TopContents.forEach((godivaJson) => {
    sec2TopItems += `
        <a href="#">
            <li>${godivaJson.sec2TextsMain}</li>
            <li>${godivaJson.sec2TextsSub}</li>
        </a>
        `;
  });
  section2ItemsTop.appendChild(section2ItemsTopUl).innerHTML = sec2TopItems;

  //sec2Bottom========================
  const section2ItemsBottom = document.querySelector(".section2_items_bottom");
  const section2ItemsBottomUl = document.createElement("ul");
  let sec2BottomItems = "";

  godivaJsons.section2BottomContents.forEach((godivaJson) => {
    sec2BottomItems += `
            <a href="#">
                <li>${godivaJson.sec2TextsB}</li>
            </a>
            `;
  });

  section2ItemsBottomUl.innerHTML = sec2BottomItems;
  section2ItemsBottom.appendChild(section2ItemsBottomUl);

  // footer=============================
  const footer = document.querySelector(".footer_top");
  let footerItems = "";

  godivaJsons.footerContents.forEach((godivaJson) => {
    footerItems += `
      <div class="footer_top_content">
      <ul>
      <h4>${godivaJson.footerTitle}</h4>`;

    const footerDetails = godivaJson.footerDetail;
    if (Array.isArray(footerDetails)) {
      footerDetails.forEach((detail) => {
        footerItems += `<li>${detail}</li>`;
      });
    } else if (typeof footerDetails === "string") {
      // If footerDetail is a string
      footerItems += `<li>${footerDetails}</li>`;
    }

    footerItems += `</ul></div>`;
  });

  footer.innerHTML = footerItems;

  const lastFooterContent = document.querySelector(".footer_top_content:last-child ul li");
  lastFooterContent.innerHTML = `
    <div id="sns_contents">
      <a href="https://www.facebook.com/GODIVAKR/"><img src="./GODIVA_img/icon/facebook.png" alt="facebook"></a>
      <a href="https://www.instagram.com/godivakorea/"><img src="./GODIVA_img/icon/instagram.png" alt="instagram"></a>
      <a href="https://twitter.com/GODIVA"><img src="./GODIVA_img/icon/x.png" alt="x"></a>
      <a href="https://www.youtube.com/channel/UCFB6ZUKG6l6pB0wvDvxjftg"><img src="./GODIVA_img/icon/youtube.png" alt="youtube"></a>
    </div>
    <form action="#">
      <label for="familysite"></label>
        <select name="site" id="familysite">
            <option value="familysite">패밀리 사이트</option>
            <option value="thebodyshop">더 바디샵</option>
            <option value="hollandandbarret">홀랜드 앤 바렛</option>
            <option value="whittard">위타드 오브 첼시</option>
        </select>
    </form>
    <label for="email"></label>
    <input type="email" id="email" placeholder="email address"/>
    <input type="submit" value="뉴스레터 신청" />
    `
document.querySelector("#email").focus()

const snsImages = document.querySelectorAll("#sns_contents a img");
const imagePaths = [
  "./GODIVA_img/icon/facebook_g.png",
  "./GODIVA_img/icon/instagram_g.png",
  "./GODIVA_img/icon/x_g.png",
  "./GODIVA_img/icon/youtube_g.png"
];

snsImages.forEach((image, index) => {
  image.style.transition = "all 3s";

  image.addEventListener("mouseover", () => {
    image.src = imagePaths[index];
  });

  image.addEventListener("mouseout", () => {
    image.src = `./GODIVA_img/icon/${image.alt}.png`;
  });
});
}

init();

// setion1=============================================
const banner = document.querySelector(".banner");
const bannerTexts = document.querySelectorAll(".banner_text_box");
const bannerTextATags = document.querySelectorAll(".banner_text_box a");

banner.addEventListener("mouseover", () => {
  bannerTexts.forEach((bannerText) => {
    bannerText.style.color = "#2b120a";
    bannerText.style.transition = "0.3s";
  });

  bannerTextATags.forEach((bannerTextATag) => {
    bannerTextATag.style.color = "#2b120a";
    bannerTextATag.style.border = "1px solid #2b120a";
    bannerTextATag.style.transition = "0.3s";
  });
});

banner.addEventListener("mouseout", () => {
  bannerTexts.forEach((bannerText) => {
    bannerText.style.color = "";
  });

  bannerTextATags.forEach((bannerTextATag) => {
    bannerTextATag.style.color = "";
    bannerTextATag.style.border = "";
  });
});

// section1: slider
const track = document.querySelector(".slides");
const items = document.querySelectorAll(".slide");
const itemWidth = items[0].offsetWidth;
let currentIndex = 0;

function updateSlider() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlider();
}

function handleTransitionEnd() {
  track.style.transition = "";
}

track.addEventListener("transitionend", handleTransitionEnd);

setInterval(nextSlide, 3000);
