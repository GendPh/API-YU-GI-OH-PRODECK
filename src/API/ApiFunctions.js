let filteredData = [];
const loader = document.querySelector(".loader");
const buttonContainerChange = document.querySelector("#buttonCardContainer");
const archetypesSelectContainer = document.getElementById("archetypes");


export async function createArchetypesOptions() {
  let archetypesUrl = "https://db.ygoprodeck.com/api/v7/archetypes.php";

  const response = await fetch(archetypesUrl);

  if (!response.ok) {
    throw new Error(`Http error! Status: ${response.status}`)
  }
  const archetypes = await response.json();

  archetypes.forEach(arch => {
    const optionArch = document.createElement("option");
    optionArch.value = arch.archetype_name;
    optionArch.textContent = arch.archetype_name;
    archetypesSelectContainer.appendChild(optionArch);
  });
}

export function createImg(container, array, type) {
  container.classList.replace("grid-cols-1", "grid-cols-5")

  array.forEach(cards => {
    let div = document.createElement("div");
    if (type.length > 0) {
      div.classList.add("banList");
      div.classList.add(type);
    }

    let img = document.createElement("img");
    img.loading = "lazy";
    img.src = `public/card/${cards.id}.jpg`;
    img.alt = cards.name;

    if (type.length > 0) {
      div.appendChild(img);
      container.appendChild(div);
    } else {
      img.classList.add("img-card");
      container.appendChild(img);
    }
  });

  let divImages = gsap.utils.toArray(".banList");
  let cardImages = gsap.utils.toArray(".img-card");

  gsap.to(
    divImages,
    { opacity: 1, y: 0, delay: 0.05, stagger: 0.05 });

  gsap.to(
    cardImages,
    { opacity: 1, y: 0, delay: 0.05, stagger: 0.05 });

}

export function sliceCards(array, sliceStart, sliceEnd, container) {
  if (array.length > 0) {
    let sliceArray = array.slice(sliceStart, sliceEnd);
    createImg(container, sliceArray, "");
  } else {
    let errorMessage = "Can't Find what you locking for"
    failToLoadCards(errorMessage);
  }
}

export function changeCards(array, archSearch, typeSearch, lvlSearch, value) {
  resetCardContainer();
  filteredData = [];
  let searchOptions = {
    arch: archSearch,
    type: typeSearch,
    lvl: lvlSearch,
  }

  setTimeout(() => {
    array.forEach(card => {
      if (archSearch.length > 0 && typeSearch.length == 0 && typeof (lvlSearch) === "string") {
        if (card.archetype == archSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length > 0 && typeSearch.length > 0 && typeof (lvlSearch) == "string") {
        if (card.archetype == archSearch && card.type == typeSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length > 0 && typeSearch.length > 0 && typeof (lvlSearch) == "number") {
        if (card.archetype == archSearch && card.type == typeSearch && card.level == lvlSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length == 0 && typeSearch.length > 0 && typeof (lvlSearch) == "string") {
        if (card.type == typeSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length == 0 && typeSearch.length > 0 && typeof (lvlSearch) == "number") {
        if (card.type == typeSearch && card.level == lvlSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length == 0 && typeSearch.length == 0 && typeof (lvlSearch) == "number") {
        if (card.level == lvlSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length > 0 && typeSearch.length == 0 && typeof (lvlSearch) == "number") {
        if (card.archetype == archSearch && card.level == lvlSearch) {
          filteredData.push(card);
        }
      } else if (archSearch.length == 0 && typeSearch.length == 0 && typeof (lvlSearch) == "string") {
        filteredData = array;
      }
    });

    loader.classList.add("hidden");
    sliceCards(filteredData, 0, 25, cardContainer);
    createButtons(filteredData);
  }, 1000);
}

function resetCardContainer() {
  let childNodes = Array.from(cardContainer.childNodes);
  for (let i = 2; i < childNodes.length; i++) {
    cardContainer.removeChild(childNodes[i]);
  }
  while (buttonContainerChange.hasChildNodes()) {
    buttonContainerChange.removeChild(buttonContainerChange.lastChild);
  }
  cardContainer.classList.replace("grid-cols-5", "grid-cols-1")
  loader.classList.remove("hidden");
  gsap.to(loader, { opacity: 1, duration: 1, delay: 0.6 })
}


export function createButtons(array) {

  let dataDivided = Math.round(array.length / 25);

  for (let i = 0; i < dataDivided; i++) {
    let button = document.createElement("button");

    button.classList.add("container-change", "snap-center", "text-text", "shadow-md", "shadow-secondary", "px-6", "active:scale-75", "transition-all", "duration-200", "ease-linear");

    if (i == 0) {
      button.classList.add("bg-primary");
    } else {
      button.classList.add("bg-primary-secondary");
    }
    button.textContent = i;

    buttonContainerChange.appendChild(button);
  }

  const buttonChange = document.querySelectorAll(".container-change");

  buttonChange.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("bg-primary")) {
        buttonChange.forEach((btn) => {
          btn.classList.replace("bg-primary", "bg-primary-secondary");
        });
        button.classList.replace("bg-primary-secondary", "bg-primary");

        let childNodes = Array.from(cardContainer.childNodes);

        for (let i = 2; i < childNodes.length; i++) {
          cardContainer.removeChild(childNodes[i]);
        }

        let sliceStart = 25 * index;
        let sliceEnd = 25 * (index + 1);

        if (index != 0) {
          sliceStart++;
          sliceEnd++;
        }

        sliceCards(array, sliceStart, sliceEnd, cardContainer);
      }
    })
  })
}

export function toggleClass(btn1, btn2, action) {
  if (action == "remove") {
    btn1.classList.remove("opacity-50", "pointer-events-none");
    btn2.classList.remove("opacity-50", "pointer-events-none");
  } if (action == "add") {
    btn1.classList.add("opacity-50", "pointer-events-none");
    btn2.classList.add("opacity-50", "pointer-events-none");
  }
}


export function failToLoadCards(errorMessage) {
  cardContainer.classList.replace("grid-cols-4", "grid-cols-1")
  let errorMessageContainer = document.createElement("p");
  errorMessageContainer.classList.add("text-text")
  errorMessageContainer.textContent = "An error occurred: " + errorMessage;
  cardContainer.appendChild(errorMessageContainer);
}

