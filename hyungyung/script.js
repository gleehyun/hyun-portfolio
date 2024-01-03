const navs = document.querySelectorAll(".nav ul li")
  
//full page===============================================
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    anchors: ['Num0', 'Num1', 'Num2', 'Num3', 'Num4'],
    afterLoad: (oldSection, newSection, direction)=>{
        navs.forEach((nav, index) => {
            if (newSection.index === index) {
                nav.classList.add("clicked");
                const aTag = nav.querySelector("a");
                aTag.style.color = "#ff6726";
            } else {
                nav.classList.remove("clicked");
                const aTag = nav.querySelector("a");
                aTag.style.color = "";
            }
        });

        document.querySelectorAll('.section').forEach((section, index) => {
          if (newSection.index === index) {
            section.classList.add("active");
          } else {
            section.classList.remove("active");
          }
        });
      
    }
});

// navigation===================================================

navs.forEach((nav, index) => {
    nav.addEventListener("click", () => {
        nav.classList.toggle("clicked");
        navs.forEach((otherNav, otherIndex) => {
            if (index !== otherIndex) {
                otherNav.classList.remove("clicked");
                otherNav.querySelector("a").style.color = "";
            }
        });
        const isClicked = nav.classList.contains("clicked");
        const aTag = nav.querySelector("a");
        aTag.style.color = isClicked ? "#ff6726" : "";
    });
});

// sec1=================================================================
const moreInfo = document.querySelector(".sec1_text_box_moreinfo button");
const moreInfoContents = document.querySelector(".sec1_text_box_moreinfo_contents");

moreInfo.addEventListener("click", (e) => {
    e.preventDefault();
    moreInfoContents.classList.toggle("show");
});
  

// json===================================================================
const jsonFile = "./hyungyung.json";

async function init() {
  const response = await fetch(jsonFile);
  const hgJsons = await response.json();
  display(hgJsons);
}

function display(hgJsons) {
  // sec2==========================================================
  const designProcess = document.querySelector(".sec2_design_process");
  let designProcessEl = "";

  hgJsons.DesignProcess.forEach((hgJson) => {
    designProcessEl += `
      <ul>
        <h4>${hgJson.ProcessTitle}</h4>
        `;

    const designProcessDetails = hgJson.ProcessDetail;
    if (Array.isArray(designProcessDetails)) {
      designProcessDetails.forEach((detail) => {
        designProcessEl += `<li>${detail}</li>`;
      });
    } else if (typeof designProcessDetails === "string") {
      designProcessEl += `<li>${designProcessDetails}</li>`;
    }

    designProcessEl += `</ul>`;
  });

  designProcess.innerHTML = designProcessEl;
}

init();


const s_Slider = document.querySelectorAll('.sec3_slider li');
const s_Icons = document.querySelectorAll('.slide_icons li');
const s_Left = document.querySelector('.slide_btn.left');
const s_Right = document.querySelector('.slide_btn.right');

let currentIndex = 0;

const s_reset = () => {
  s_Slider.forEach((elem, idx) => {
    s_Slider[idx].classList.remove('on');
    s_Icons[idx].classList.remove('active');
  });
};

s_Icons.forEach((li) => {
  li.addEventListener('click', (e) => {
    let target = e.target.dataset.index;
    s_reset();
    if (li.tagName === 'LI') {
      currentIndex = target;
      updateSlide();
    }
  });
});

const next = () => {
  s_reset();
  currentIndex = (currentIndex + 1) % s_Slider.length;
  updateSlide();
};

s_Right.addEventListener('click', next);

const prev = () => {
  s_reset();
  currentIndex = (currentIndex - 1 + s_Slider.length) % s_Slider.length;
  updateSlide();
};

s_Left.addEventListener('click', prev);

const updateSlide = () => {
  s_Slider[currentIndex].classList.add('on');
  s_Icons[currentIndex].classList.add('active');
};