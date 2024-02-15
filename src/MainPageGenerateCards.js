import { LoadCards } from "./CreateCards/CreateCard.js";
import { FetchApi } from "./API/FetchApi.js";

const all_cards_container = document.querySelector("#all-list");
const newest_cards_container = document.querySelector("#newest-list");
const tcg_ban_list_container = document.querySelector("#ban-list-tcg");
const ocg_ban_list_container = document.querySelector("#ban-list-ocg");
const speed_duel_container = document.querySelector("#speed-duel-list");

async function LoadCardList(container, url, sliced, shuffle_chose, ban_list) {
  const result = await FetchApi(url);
  let data;
  if (shuffle_chose === "shuffle" && !Object.keys(result).includes("error")) {
    data = shuffleArray(result.data);
    data = data.slice(0, sliced);
  } else if (shuffle_chose !== "shuffle" && !Object.keys(result).includes("error")) {
    data = result.data.slice(0, sliced);
  } else {
    data = result;
  }
  LoadCards(container, data, ban_list);
}
function LoadNewestList() {
  const date = new Date(); // Get the current date
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const start_date = `${year}-${month - 1}-01`;
  const end_date = `${year}-${month}-${day}`;

  LoadCardList(newest_cards_container, `https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=${start_date}&enddate=${end_date}`, 6, "no");
}


LoadCardList(all_cards_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php", 6, "shuffle");
LoadNewestList();
LoadCardList(tcg_ban_list_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg", 6, "shuffle", "tcg");
LoadCardList(ocg_ban_list_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=ocg", 6, "shuffle", "ocg");
LoadCardList(speed_duel_container, "https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed Duel&type=Skill Card", 6, "shuffle");


// async function loadcard() {
//   const data = await GetCard(66518509);
//   console.log(data.data);
// }

// loadcard();


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
