import { FetchApi, GetValueFromURL, shuffleArray } from "../src/API/FetchApi.js";
import { CardElement, LoadCards } from "../src/CreateCards/CreateCard.js";

//Card ID: "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=1861630";

const card_id = GetValueFromURL("card");
const URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

async function LoadCardInfo() {
  let result = (!card_id.error) ? await FetchApi(URL + `?id=${card_id}`) : card_id;

  let DOMElem = {
    title: document.querySelector("#title"),
    card_img: document.querySelector("#card-img"),
    card_type: document.querySelector("#card-type"),
    card_race: document.querySelector("#card-race"),
    card_desc: document.querySelector("#card-description"),
    card_sets: document.querySelector("#card-sets"),
    card_related: document.querySelector("#card-related"),
  }

  if (!result.error) {
    result = await result.data[0];

    DOMElem.title.textContent = result.name;
    DOMElem.card_img.innerHTML = CardElement(result);
    DOMElem.card_type.innerHTML = `<span class="text-accent font-bold">Type:</span> ${result.type}`;
    DOMElem.card_race.innerHTML = `<span class="text-accent font-bold">Race:</span> ${result.race}`;
    DOMElem.card_desc.textContent = result.desc;
    if (result.card_sets) {
      result.card_sets.forEach(sets => {
        const p_el = document.createElement("p");
        p_el.innerHTML = `<a href="#" class="underline underline-offset-4" title="${sets.set_name}">${sets.set_name + sets.
          set_rarity_code}</a> ${sets.set_price}€`;
        DOMElem.card_sets.appendChild(p_el);
      });
    } else {
      const p_el = document.createElement("p");
      p_el.textContent = "No card sets associated";
      DOMElem.card_sets.appendChild(p_el);
    }
    let related_cards = await FetchApi(URL + `?archetype=${(result.archetype)?result.archetype:"blue-eyes"}`);
    if (!related_cards.error) {
      related_cards = related_cards.data.filter(obj => obj.name !== result.name);
      related_cards = shuffleArray(related_cards);
      related_cards = related_cards.slice(0, 8);
      LoadCards(DOMElem.card_related, related_cards);
    }
  }
}

LoadCardInfo();