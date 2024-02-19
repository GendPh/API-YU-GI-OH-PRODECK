export function CardElement(card) {
  const imageSrc = `/src/Assets/card/${card.id}.jpg`;
  const fallbackImageSrc = '/src/Assets/card/cardBack.jpg';

  // Create an Image object to check if the image exists
  const img = new Image();
  img.src = imageSrc;

  img.onerror = function () {
    // If the image doesn't exist, replace it with the fallback image
    const element = document.querySelector(`img[src="${imageSrc}"]`);
    if (element) {
      element.src = fallbackImageSrc;
      element.alt = "Card Back"; // Optionally, change the alt text too
    }
  };

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
    error_message.textContent = data.error;
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