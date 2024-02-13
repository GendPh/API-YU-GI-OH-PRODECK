import { CardElement, SetCard } from "./CreateCards/CreateCard.js";
import { GetCardList, GetBanList, GetCardSetList } from "./API/GetAllCards.js";

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
      a_el.innerHTML = CardElement(card, (card.id) ? card.id : "cardBack", "card");
      a_el.classList.add(ban_list_type);
      ban_list_container.appendChild(a_el);
    });
  }
}

const card_sets_container = document.querySelector("#card-set-container");

export async function LoadSetCards(container, sliced) {
  const loader = container.querySelector(".loader-container");
  const error_message = container.querySelector(".error-message");
  const list_data = await GetCardSetList();
  console.log(list_data);
  loader.classList.add("hidden");

  if (Object.keys(list_data).includes("error")) {
    error_message.classList.remove("hidden");
  } else {
    const sliced_list = list_data.slice(0, sliced);
    console.log(sliced_list);
    sliced_list.forEach(card => {
      const div_el = document.createElement("div");
      div_el.innerHTML = SetCard(card);
      container.appendChild(div_el);
    });
  }
}

LoadBanListCards("tcg", tcg_ban_list_container, 6);
LoadBanListCards("ocg", ocg_ban_list_container, 6);
LoadSetCards(card_sets_container, 6);