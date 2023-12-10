// json ===================================
const jsonFile = "./connect.json";

async function init() {
    const response = await fetch(jsonFile);
    const connectJson = await response.json();
    display(connectJson);
}

function display(connectJson) {
    // section2 ===============================
    const sec2ArtistWork = document.querySelector(".sec2_artist_work");
    let sec2ArtistWorkEl = "";
    
    connectJson.artistWorks.forEach((artistWork) => {
        sec2ArtistWorkEl += `
        <img src="${artistWork.src}" alt="${artistWork.alt}" />
        `;
    });
    
    sec2ArtistWork.innerHTML = sec2ArtistWorkEl;
    
    // section2 mainimg change 
    const sec2ArtistPic = document.querySelector("#sec2_artist_pic");
    
    function changeImage(event) {
        const clickedSrc = event.target.src;
        const clickedAlt = event.target.alt;
    
        const mainImage = document.querySelector("#sec2_artist_pic img");
    
        mainImage.src = clickedSrc;
        mainImage.alt = clickedAlt;
    }
    
    // 각 이미지에 클릭 이벤트 리스너 추가
    const artistImages = sec2ArtistWork.querySelectorAll("img");
    
    artistImages.forEach((image) => {
        image.addEventListener("click", changeImage);
    });
    
    // section4================================
    const serviceContents = document.querySelector(".service_contents");
    let serviceContentsEl = "";
    
    connectJson.services.forEach((service) => {
      // 마지막 띄어쓰기에만 줄바꿈 적용
      const nameWithLineBreak = service.name.replace(/(.*)(\s)/, (_, rest, space) => `${rest}<br>${space}`);
      serviceContentsEl += `
        <div class="our_service_content_frame">
          <ul class="service_content">
            <li>${nameWithLineBreak}</li>
            <li><a href="">
              <img src="${service.imageSrc}" alt="${service.imageAlt}" />
            </a></li>
          </ul>
        </div>
      `;
    });
    
    serviceContents.innerHTML = serviceContentsEl;
}

init();

// header==============================
document.querySelector("#search").focus()