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

// sec3 slider==============
const s_Slider = document.querySelectorAll(".sec3_slider li");
const s_Icons = document.querySelectorAll(".slide_icons li");
const s_Left = document.querySelector(".slide_btn.left");
const s_Right = document.querySelector(".slide_btn.right");

const s_reset = () => {
  s_Slider.forEach((elem, idx) => {
    s_Slider[idx].classList.remove("on");
    s_Icons[idx].classList.remove("active");
  });
};

s_Icons.forEach((li) => {
  li.addEventListener("click", (e) => {
    let target = e.target.dataset.index;
    console.log(target);
    s_reset();
    if (li.tagName === "LI") {
      for (let i = 0; i < s_Icons.length; i++) {
        if (target == i) {
          s_Slider[i].classList.add("on");
          s_Icons[i].classList.add("active");
        }
      }
    }
  });
});

const next = (e)=>{
  e.preventDefault();
  let crtSlide=  document.querySelector(".sec3_slider li.on");
  let i = crtSlide.dataset.index;
  s_reset();
  i++;
  if (i >= s_Slider.length) {
    i = 0;
  }
  s_Slider[i].classList.add('on');
  s_Icons[i].classList.add('active');
};

s_Right.addEventListener('click', next);

const prev = (e) => {
  e.preventDefault();
  let crtSlide = document.querySelector('.sec3_slider li.on');
  let i = crtSlide.dataset.index;
  s_reset();
  i--;
  if (i < 0) {
    i = s_Slider.length - 1;
  }
  s_Slider[i].classList.add('on');
  s_Icons[i].classList.add('active');
};

s_Left.addEventListener('click', prev);

// sec4 slider=======================================
const s_Slider02 = document.querySelectorAll(".sec4_slider li");
const s_Icons02 = document.querySelectorAll(".slide_icons02 li");
const s_Left02 = document.querySelector(".slide_btn.left02");
const s_Right02 = document.querySelector(".slide_btn.right02");

const s_reset02 = () => {
  s_Slider02.forEach((elem, idx) => {
    s_Slider02[idx].classList.remove("on");
    s_Icons02[idx].classList.remove("active");
  });
};

s_Icons02.forEach((li) => {
  li.addEventListener("click", (e) => {
    let target = e.target.dataset.index;
    console.log(target);
    s_reset02();
    if (li.tagName === "LI") {
      for (let i = 0; i < s_Icons02.length; i++) {
        if (target == i) {
          s_Slider02[i].classList.add("on");
          s_Icons02[i].classList.add("active");
        }
      }
    }
  });
});

const next02 = (e) => {
  e.preventDefault();
  let crtSlide = document.querySelector(".sec4_slider li.on");
  let i = crtSlide ? crtSlide.dataset.index : 0;
  s_reset02();
  i++;
  if (i >= s_Slider02.length) {
    i = 0;
  }
  s_Slider02[i].classList.add("on");
  s_Icons02[i].classList.add("active");
};

s_Right02.addEventListener("click", next02);

const prev02 = (e) => {
  e.preventDefault();
  let crtSlide = document.querySelector(".sec4_slider li.on");
  let i = crtSlide ? crtSlide.dataset.index : s_Slider02.length - 1;
  s_reset02();
  i--;
  if (i < 0) {
    i = s_Slider02.length - 1;
  }
  s_Slider02[i].classList.add("on");
  s_Icons02[i].classList.add("active");
};

s_Left02.addEventListener("click", prev02);
// modal===============================================

let modalCounter = 1;

function openModal(modalId, modalUrl) {
  const modalFrameId = "modalFrame" + modalId.charAt(modalId.length - 1);

  let modalContainer = document.querySelector('#modalContainer');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modalContainer';
    document.body.appendChild(modalContainer);
  }

  const modalElement = document.createElement('div');
  modalElement.id = 'myModal' + modalCounter;
  modalElement.className = 'modal';
  modalElement.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal('myModal${modalCounter}')">&times;</span>
      <iframe id="${modalFrameId}" src="${modalUrl}" width="100%" height="100%" frameborder="0" style="overflow: hidden;"></iframe>
    </div>
  `;

  modalContainer.appendChild(modalElement);

  document.querySelector(`#myModal${modalCounter}`).style.display = 'block';

  modalCounter++;
}

function closeModal(modalId) {
  const modalFrameId = "modalFrame" + modalId.charAt(modalId.length - 1);
  document.querySelector(`#${modalFrameId}`).src = "";
  document.querySelector(`#${modalId}`).style.display = 'none';
}