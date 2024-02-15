export function CardElement(card) {
  const imageUrl = card.card_images && card.card_images.length > 0 ? card.card_images[0].image_url : null;
  const imageSrc = imageUrl ? `src/Assets/card/${card.id}.jpg` : `src/Assets/card/cardBack.jpg`;
  return `<img src="${imageSrc}" alt="${card.name}">`;
}
