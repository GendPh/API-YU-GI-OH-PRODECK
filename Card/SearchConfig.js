// Importing necessary modules
import { FetchApi } from "../src/API/FetchApi.js";
import { LoadCards } from "../src/CreateCards/CreateCard.js";

// Getting the search form element
const searchForm = document.getElementById('searchForm');

// Function to handle form submission and input
async function handleSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the container element for search results
  const container = document.getElementById("card-search");

  // HTML template for error message and loading state
  const html = `
  <!-- Error Message state -->
  <p class="error-message hidden">We're sorry, but we encountered an issue while trying to retrieve the requested data. Please try again later. If the problem persists, feel free to contact our support team for assistance.
  </p>
  <!-- Loader for loading state -->
  <div class="loader-container col-span-3 md:col-span-5 lg:col-span-10">
    <span class="loader"></span>
  </div>`;

  // Insert the HTML into the container
  container.innerHTML = html;

  // Get the search term from the input field and trim any whitespace
  const searchTerm = document.getElementById('searchInput').value.trim();

  // If search term is not empty
  if (searchTerm !== '') {
    // Construct the URL for API request
    let URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    // Fetch card data from API with search term
    let card_result = await FetchApi(URL + `?fname=${searchTerm}`);

    // Show container and process card data if no error
    if (!card_result.error) {
      container.classList.replace("hidden", "grid");
      // Slice the data to get the first 20 results
      card_result = card_result.data.slice(0, 20);
    } else {
      // If error, display error message
      card_result = { error: "No cards collected! " };
    }

    // Load the cards into the container
    LoadCards(container, card_result);
  } else {
    // If search term is empty, hide the container
    container.classList.replace("grid", "hidden");
  }
}

// Add event listeners to the search form for submission and input events
searchForm.addEventListener('submit', handleSubmit);
searchForm.addEventListener('input', handleSubmit);
