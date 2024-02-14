export function CardElement(card) {
  return `<img src="src/Assets/card/${(card.card_images[0].image_url) ? card.id : "cardBack"}.jpg" alt="${card.name}">`
}