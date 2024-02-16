export function CardElement(card) {
  const imageUrl = card.card_images && card.card_images.length > 0 ? card.card_images[0].image_url : null;
  const imageSrc = imageUrl ? `/src/Assets/card/${card.id}.jpg` : `src/Assets/card/cardBack.jpg`;
  return `<img src="${imageSrc}" alt="${card.name}" >`;
}

function CreateLinkCard(container, card, ban_list) {
  let ban_list_type;
  if (ban_list === "tcg") {
    ban_list_type = card.banlist_info?.ban_tcg || "not-ban";
  } else {
    ban_list_type = card.banlist_info?.ban_ocg || "not-ban";
  }

  const a_el = document.createElement("a");
  a_el.title = card.name;
  a_el.href = `/Card/card.html?card=${card.id}`
  a_el.classList.add(ban_list_type);
  a_el.innerHTML = CardElement(card);
  container.appendChild(a_el);
}

export function LoadCards(container, data, ban_list) {
  const loader = container.querySelector(".loader-container");
  const error_message = container.querySelector(".error-message");
  loader.classList.add("hidden");

  if (data.error) {
    error_message.classList.remove("hidden");
  } else {
    data.forEach(card => {
      CreateLinkCard(container, card, ban_list);
    });
    const cards_el = container.querySelectorAll(".card-container a");
    const gsap_duration = 0.15;
    const gsap_stagger = gsap_duration / 2;
    gsap.to(cards_el, { opacity: 1, stagger: gsap_stagger, duration: gsap_duration });
  }
}