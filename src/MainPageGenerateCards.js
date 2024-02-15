import { CardElement } from "./CreateCards/CreateCard.js";
import { GetCardList, GetBanList, GetCard } from "./API/GetAllCards.js";

async function loadcard() {
  const data = await GetCard(66518509);
  console.log(data.data);
}

loadcard();

const tcg_ban_list_container = document.querySelector("#ban-list-tcg");
const ocg_ban_list_container = document.querySelector("#ban-list-ocg");

export async function LoadBanListCards(ban_list, ban_list_container, sliced) {
  const loader = ban_list_container.querySelector(".loader-container");
  const error_message = ban_list_container.querySelector(".error-message");
  const list_data = await GetBanList(ban_list);
  loader.classList.add("hidden");
  if (Object.keys(list_data).includes("error")) {
    error_message.classList.remove("hidden");
  } else {
    const sliced_list = list_data.data.slice(0, sliced);
    sliced_list.forEach(card => {
      let ban_list_type;
      if (ban_list === "tcg") {
        ban_list_type = (card.banlist_info.ban_tcg) ? card.banlist_info.ban_tcg : "";
      } else {
        ban_list_type = (card.banlist_info.ban_ocg) ? card.banlist_info.ban_ocg : "";
      }
      const a_el = document.createElement("a");
      a_el.title = card.name;
      a_el.innerHTML = CardElement(card);
      a_el.classList.add(ban_list_type);
      ban_list_container.appendChild(a_el);
    });
  }
}


LoadBanListCards("tcg", tcg_ban_list_container, 6);
LoadBanListCards("ocg", ocg_ban_list_container, 6);

const all_cards_container = document.querySelector("#all-list");
export async function LoadAllCardsList(container, sliced) {
  const loader = container.querySelector(".loader-container");
  const error_message = container.querySelector(".error-message");
  const list_data = await GetCardList("https://db.ygoprodeck.com/api/v7/cardinfo.php");
  loader.classList.add("hidden");

  if (Object.keys(list_data).includes("error")) {
    error_message.classList.remove("hidden");
  } else {
    const sliced_list = list_data.slice(0, sliced);
    sliced_list.forEach(card => {
      const a_el = document.createElement("a");
      a_el.title = card.name;
      a_el.innerHTML = CardElement(card);
      container.appendChild(a_el);
    });
  }
}
LoadAllCardsList(all_cards_container, 15);