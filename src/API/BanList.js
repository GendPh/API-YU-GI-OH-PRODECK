import { fetchBanList } from "./FetchApi.js";
import { createImg } from "./ApiFunctions.js";

let banLoaded = false;
const banListContainer = document.getElementById("banListContainer");
const containerLoader = banListContainer.querySelector(".loader");
const banListTypeContainer = document.getElementById("banListType");
const buttonBanListType = banListTypeContainer.querySelectorAll(".button");

let banList = {
  tcg: {
    Banned: [],
    Limited: [],
    SemiLimited: [],
  },
  ocg: {
    Banned: [],
    Limited: [],
    SemiLimited: [],
  }
}

ScrollTrigger.create({
  trigger: banListContainer,
  markers: false,
  start: "bottom 80%",
  onEnter: () => {
    if (!banLoaded) {
      firstLoadBandList()
      banLoaded = true;
    }
  }
})

async function firstLoadBandList() {
  containerLoader.classList.remove("hidden");
  await fetchBanList(banList);
  createImg(banListContainer, banList.tcg.Banned, "Banned");
  containerLoader.classList.add("hidden");
}

const banListGenre = document.getElementById("banListGenre");
const banListGenreButton = banListGenre.querySelectorAll("button");

let banListChosen = banList.tcg;

banListGenreButton.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (index == 0) {
      banListChosen = banList.tcg;
    } else {
      banListChosen = banList.ocg;
    }

    banListGenreButton.forEach(btn => {
      if (btn.classList.contains("button-primary")) {
        btn.classList.replace("button-primary", "button-secondary")
      }
    })

    buttonBanListType.forEach(innerBtn => {
      if (innerBtn.classList.contains("button-primary")) {
        innerBtn.classList.replace("button-primary", "button-secondary")
      }
    })
    buttonBanListType[0].classList.replace("button-secondary", "button-primary")

    button.classList.replace("button-secondary", "button-primary")
    resetContainer(banListContainer);
    createImg(banListContainer, banListChosen.Banned, "Banned");
    containerLoader.classList.add("hidden");
  })
})


buttonBanListType.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    buttonBanListType.forEach(btn => {
      if (btn.classList.contains("button-primary")) {
        btn.classList.replace("button-primary", "button-secondary")
      }
    })
    button.classList.replace("button-secondary", "button-primary")
    resetContainer(banListContainer);

    const banListKey = button.getAttribute("data-ban-list");

    createImg(banListContainer, banListChosen[banListKey], banListKey);
    containerLoader.classList.add("hidden");
  })
})

function resetContainer(container) {

  let childNodes = Array.from(container.childNodes);
  for (let i = 2; i < childNodes.length; i++) {
    container.removeChild(childNodes[i]);
  }
  container.classList.replace("grid-cols-5", "grid-cols-1")
  containerLoader.classList.remove("hidden");
  gsap.fromTo(containerLoader, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 })

}
