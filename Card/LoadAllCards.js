// Importing necessary modules
import { FetchApi, GetValueFromURL, paginateObject } from "../src/API/FetchApi.js";
import { LoadCards } from "../src/CreateCards/CreateCard.js";

// Function to load all cards based on URL parameters
async function LoadAllCards() {
  // Get page number, archetype, type, and race from URL
  const page_number = GetValueFromURL("page");
  const archetype = GetValueFromURL("archetype");
  const archetype_value = (!archetype.error) ? `archetype=${archetype}&` : "";
  const type = GetValueFromURL("type");
  const type_value = (!type.error) ? `type=${type}&` : "";
  const race = GetValueFromURL("race");
  const race_value = (!race.error) ? `race=${race}&` : "";
  
  // Construct URL based on parameters
  const URL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${archetype_value}${type_value}${race_value}`;
  
  // Get the container for all cards
  const card_container = document.getElementById("all-cards");
  console.log(URL);
  
  // Fetch data from API
  let data = await FetchApi(URL);
  
  // If no error, paginate data and load buttons
  if (!data.error) {
    const paged_data = paginateObject(data.data, 50);
    data = (page_number <= paged_data.length) ? paged_data[page_number - 1] : { error: "No cards available" };
    LoadButtons(paged_data, page_number);
  }
  
  // Load cards into container
  LoadCards(card_container, data);
}

// Function to load pagination buttons
function LoadButtons(data, page) {
  const button_container = document.getElementById("page-buttons");
  for (let i = 0; i < data.length; i++) {
    const link = CreateButtons([i + 1]);
    if (page == i + 1) {
      link.classList.add("active");
    }
    button_container.appendChild(link);
  }
  
  // Scroll to center the active button
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

// Function to create pagination buttons
function CreateButtons(page) {
  const a = document.createElement("a");
  a.href = `./allCards.html?page=${page}`;
  a.title = `Redirect to Page ${page}`;
  a.textContent = page;
  return a;
}

// Load all cards when the page loads
LoadAllCards();
