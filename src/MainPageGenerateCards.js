import { CardElement } from "./CreateCards/CreateCard.js";
import { GetCardList, GetBanList } from "./API/GetAllCards.js";

const tcg_ban_list_container = document.querySelector("#ban-list-tcg");
const ocg_ban_list_container = document.querySelector("#ban-list-ocg");

async function LoadBanListCards(ban_list, ban_list_container) {
  const list_data = await GetBanList(ban_list);
  console.log(list_data);

  if (Object.keys(list_data).includes("error")) {
    console.log(`Failed: ${list_data.error}`);
  } else {
    const sliced_list = list_data.data.slice(0, 20);
    console.log(sliced_list);

    sliced_list.forEach(card => {
      const a_el = document.createElement("a");
      a_el.alt = card.name;
      a_el.innerHTML = CardElement(card,);
    });
  }

}

LoadBanListCards("tcg", tcg_ban_list_container);