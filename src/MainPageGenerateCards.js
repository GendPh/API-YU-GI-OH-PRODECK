// Import necessary modules
import { LoadCards } from "./CreateCards/CreateCard.js"; // Import function to load cards
import { FetchApi } from "./API/FetchApi.js"; // Import function to fetch data from API

// Select containers for different card lists
const all_cards_container = document.querySelector("#all-list");
const newest_cards_container = document.querySelector("#newest-list");
const tcg_ban_list_container = document.querySelector("#ban-list-tcg");
const ocg_ban_list_container = document.querySelector("#ban-list-ocg");
const speed_duel_container = document.querySelector("#speed-duel-list");

// Asynchronous function to load card list into a container
async function LoadCardList(container, url, sliced, shuffle_chose, ban_list) {
  // Fetch data from the specified URL
  const result = await FetchApi(url);
  let data;

  // Check if data should be shuffled and sliced
  if (shuffle_chose === "shuffle" && !Object.keys(result).includes("error")) {
    data = shuffleArray(result.data);
    data = data.slice(0, sliced);
  } else if (shuffle_chose !== "shuffle" && !Object.keys(result).includes("error")) {
    data = result.data.slice(0, sliced);
  } else {
    data = result;
  }

  // Load cards into the container
  LoadCards(container, data, ban_list);
}

// Function to load the newest card list
function LoadNewestList() {
  const date = new Date(); // Get the current date
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const start_date = `${year}-${month - 1}-01`;
  const end_date = `${year}-${month}-${day}`;

  // Load the newest cards within the specified date range
  LoadCardList(newest_cards_container, `https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=${start_date}&enddate=${end_date}`, 6, "no");
}

// Load different card lists into their respective containers
LoadCardList(all_cards_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php", 6, "shuffle");
LoadNewestList();
LoadCardList(tcg_ban_list_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg", 6, "shuffle", "tcg");
LoadCardList(ocg_ban_list_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=ocg", 6, "shuffle", "ocg");
LoadCardList(speed_duel_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed Duel&type=Skill Card", 6, "shuffle");

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
