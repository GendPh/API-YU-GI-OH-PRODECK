import { FetchApi, GetValueFromURL, shuffleArray, paginateObject } from "../src/API/FetchApi.js";
import { CardElement, LoadCards } from "../src/CreateCards/CreateCard.js";

//Card ID: "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=1861630";

async function LoadAllCards() {
  const page_number = GetValueFromURL("page");
  const archetype = GetValueFromURL("archetype");
  const archetype_value = (!archetype.error) ? `archetype=${archetype}&` : "";
  const type = GetValueFromURL("type");
  const type_value = (!type.error) ? `type=${type}&` : "";
  const URL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${archetype_value}${type_value}`;
  const card_container = document.getElementById("all-cards");
  console.log(URL);
  let data = await FetchApi(URL);
  if (!data.error) {
    const paged_data = paginateObject(data.data, 50);
    data = (page_number <= paged_data.length) ? paged_data[page_number - 1] : { error: "No cards available" };
    LoadButtons(paged_data, page_number);
  }
  LoadCards(card_container, data);
}

function LoadButtons(data, page) {
  const button_container = document.getElementById("page-buttons");
  for (let i = 0; i < data.length; i++) {
    const link = CreateButtons([i + 1]);
    if (page == i + 1) {
      link.classList.add("active");
    }
    button_container.appendChild(link);
  }
  const targetElement = button_container.querySelector('.active');
  if (targetElement) {
    const containerWidth = button_container.clientWidth; // Width of the container
    const targetWidth = targetElement.offsetWidth; // Width of the target element
    const targetLeft = targetElement.offsetLeft; // Left position of the target element

    // Calculate the scroll position to center the target element
    const scrollPosition = targetLeft - (containerWidth / 2) + (targetWidth / 2);

    button_container.scrollTo({
      left: scrollPosition,
    });
  }

}

function CreateButtons(page) {
  const a = document.createElement("a");
  a.href = `./allCards.html?page=${page}`;
  a.title = `Redirect to Page ${page}`;
  a.textContent = page;
  return a;
}

const searchForm = document.getElementById('searchForm');

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  const container = document.getElementById("card-search");
  const html = `
  <!-- Error Message state -->
  <p class="error-message hidden">We're sorry, but we encountered an issue while trying to retrieve the requested data. Please try again later. If the problem persists, feel free to contact our support team for assistance.
  </p>
  <!-- Loader for loading state -->
  <div class="loader-container col-span-3 md:col-span-5 lg:col-span-10">
    <span class="loader"></span>
  </div>`;

  container.innerHTML = html;

  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm !== '') {
    let URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    let card_result = await FetchApi(URL + `?fname=${searchTerm}`);
    container.classList.replace("hidden", "grid");
    card_result = (!card_result.error) ? card_result.data.slice(0, 20) : { error: "No cards collected! " };
    LoadCards(container, card_result);
  } else {
    container.classList.replace("grid", "hidden");
  }
}

async function LoadSelectOptionsArchetype(url) {
  const archetypes = await FetchApi(url);
  const archetype = GetValueFromURL("archetype");
  const selectContainer = document.getElementById("archetype_select");
  archetypes.forEach(arch => {
    const option = document.createElement("option");
    option.value = arch.archetype_name;
    option.textContent = arch.archetype_name;
    if (archetype == arch.archetype_name) {
      option.selected = true;
    }
    selectContainer.appendChild(option);
  });
}

function LoadSelectOptionsType() {
  const type_array = ["Effect Monster", "Flip Effect Monster", "Flip Tuner Effect Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Pendulum Effect Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Ritual Effect Monster", "Ritual Monster", "Spell Card", "Spirit Monster", "Toon Monster", "Trap Card", "Tuner Monster", "Union Effect Monster", "Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster", "XYZ Monster", "XYZ Pendulum Effect Monster", "Skill Card", "Token"];
  const type = GetValueFromURL("type");
  const selectContainer = document.getElementById("type_select");
  type_array.forEach(t => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t;
    if (type == t) {
      option.selected = true;
    }
    selectContainer.appendChild(option);
  });
}

function HandleSelectedChange(container, id) {
  // Get the selected value of the select element
  const selectedValue = container.value;

  // Update the URL with the selected value
  const url = new URL(window.location.href);

  // Set the page parameter to 1
  url.searchParams.set('page', '1');

  // If the selected value is not empty, set the parameter in the URL
  if (selectedValue.trim() !== '') {
    url.searchParams.set(id, selectedValue);
  } else {
    // If the selected value is empty, remove the parameter from the URL
    url.searchParams.delete(id);
  }

  // Reload the page with the updated URL
  window.location.href = url.toString();
}


const archetypeSelectContainer = document.getElementById("archetype_select");
const typeSelectContainer = document.getElementById("type_select");

archetypeSelectContainer.addEventListener("change", () => { HandleSelectedChange(archetypeSelectContainer, "archetype") });

typeSelectContainer.addEventListener("change", () => { HandleSelectedChange(typeSelectContainer, "type") });



LoadSelectOptionsArchetype("https://db.ygoprodeck.com/api/v7/archetypes.php")
LoadSelectOptionsType();
// Add event listener for form submission
// searchForm.addEventListener('submit', handleSubmit);
// searchForm.addEventListener('input', handleSubmit);
LoadAllCards();