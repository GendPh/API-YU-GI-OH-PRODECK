import { fetchApi } from "./FetchApi.js";

import { createArchetypesOptions, sliceCards, changeCards, createButtons, toggleClass } from "./ApiFunctions.js";

const buttonContainerChange = document.querySelector("#buttonCardContainer");
const scrollLeftButton = document.getElementById("scrollLeftButton");
const scrollLeftDoubleButton = document.getElementById("scrollLeftDoubleButton");
const scrollRightButton = document.getElementById("scrollRightButton");
const scrollRightDoubleButton = document.getElementById("scrollRightDoubleButton");

const cardContainer = document.querySelector("#cardContainer");

const loader = document.querySelector(".loader");
let load = false;
let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
let data;
let filteredData = [];

ScrollTrigger.create({
  trigger: cardContainer,
  markers: false,
  start: "-80 80%",
  onEnter: () => {
    gsap.to(loader, { opacity: 1, scale: 1, duration: 1 })
    firstLoadOfCard();
  }
})

async function firstLoadOfCard() {
  if (!load) {
    data = await fetchApi(url);
    loader.classList.add("hidden")

    createArchetypesOptions();
    sliceCards(data, 0, 25, cardContainer)
    createButtons(data);
    load = true;
  }
}

scrollLeftButton.addEventListener("click", (event) => {
  event.preventDefault();

  buttonContainerChange.scrollLeft -= 100;

  toggleClass(scrollRightButton, scrollRightDoubleButton, "remove")

  if (buttonContainerChange.scrollLeft < 150) {
    toggleClass(scrollLeftButton, scrollLeftDoubleButton, "add");
  }
});
scrollLeftDoubleButton.addEventListener("click", (event) => {
  event.preventDefault();

  buttonContainerChange.scrollLeft -= 500;

  toggleClass(scrollRightButton, scrollRightDoubleButton, "remove")

  if (buttonContainerChange.scrollLeft < 150) {
    toggleClass(scrollLeftButton, scrollLeftDoubleButton, "add");
  }
});

scrollRightButton.addEventListener("click", (event) => {
  event.preventDefault();
  buttonContainerChange.scrollLeft += 100;

  toggleClass(scrollLeftButton, scrollLeftDoubleButton, "remove")

  if (buttonContainerChange.scrollLeft === (buttonContainerChange.scrollWidth - buttonContainerChange.clientWidth)) {
    toggleClass(scrollRightButton, scrollRightDoubleButton, "add")
  }
});
scrollRightDoubleButton.addEventListener("click", (event) => {
  event.preventDefault();
  buttonContainerChange.scrollLeft += 500;

  toggleClass(scrollLeftButton, scrollLeftDoubleButton, "remove")

  if (buttonContainerChange.scrollLeft === (buttonContainerChange.scrollWidth - buttonContainerChange.clientWidth)) {
    toggleClass(scrollRightButton, scrollRightDoubleButton, "add")
  }
});



let archetypeSearch = "";
let typeSearch = "";
let lvlRankMarkSearch = "";

archetypes.addEventListener("change", () => {
  archetypeSearch = archetypes.value;
  changeCards(data, archetypeSearch, typeSearch, lvlRankMarkSearch, "0");
})
const typesOption = document.getElementById("typeCard");
typesOption.addEventListener("change", () => {
  typeSearch = typesOption.value;
  changeCards(data, archetypeSearch, typeSearch, lvlRankMarkSearch, "0");
})
const levelCard = document.getElementById("levelCard");
levelCard.addEventListener("change", () => {
  if (levelCard.value.length > 0) {
    lvlRankMarkSearch = parseInt(levelCard.value);
  } else {
    lvlRankMarkSearch = ""
  }

  changeCards(data, archetypeSearch, typeSearch, lvlRankMarkSearch, "0");
})
