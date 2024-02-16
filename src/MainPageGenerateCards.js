// Import necessary modules
import { LoadCards } from "./CreateCards/CreateCard.js"; // Import function to load cards
import { FetchApi, shuffleArray } from "./API/FetchApi.js"; // Import function to fetch data from API

gsap.registerPlugin(ScrollTrigger);

// Select containers for different card lists
const all_cards_container = document.querySelector("#all-list");
const newest_cards_container = document.querySelector("#newest-list");
const tcg_ban_list_container = document.querySelector("#ban-list-tcg");
const ocg_ban_list_container = document.querySelector("#ban-list-ocg");
const speed_duel_container = document.querySelector("#speed-duel-list");
const URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";


// Asynchronous function to load card list into a container
async function LoadCardList(container, url, sliced, shuffle, ban_list) {
  // Fetch data from the specified URL
  let result = await FetchApi(url);
  console.log(result);
  // Check if data should be shuffled and sliced
  if (!result.error) {
    result = result.data;
    if (shuffle) {
      result = shuffleArray(result);
    }
    result = result.slice(0, sliced);
  }

  // Load cards into the container
  LoadCards(container, result, ban_list);
}

// Function to load the newest card list
function LoadNewestList() {
  const date = new Date(); // Get the current date
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const start_date = `${year}-${month - 1}-01`;
  const end_date = `${year}-${month}-${day}`;
  // Load the newest cards within the specified date range
  LoadCardList(newest_cards_container, `${URL}?startdate=${start_date}&enddate=${end_date}`, 6);
}




function setupScrollTrigger(container, onLoad) {
  const scrollTriggerDefaults = {
    markers: false,
    start: "top 35%",
    end: "top top",
    once: true,
  };

  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      ...scrollTriggerDefaults,
      onEnter: onLoad,
    }
  });
}

setupScrollTrigger(all_cards_container, () => LoadCardList(all_cards_container, URL, 6, true));
setupScrollTrigger(newest_cards_container, LoadNewestList);
setupScrollTrigger(tcg_ban_list_container, () => LoadCardList(tcg_ban_list_container, `${URL}?banlist=tcg`, 6, true, "tcg"));
setupScrollTrigger(ocg_ban_list_container, () => LoadCardList(ocg_ban_list_container, `${URL}?banlist=ocg`, 6, true, "ocg"));
setupScrollTrigger(speed_duel_container, () => LoadCardList(speed_duel_container, `${URL}?format=Speed Duel&type=Skill Card`, 6, true));