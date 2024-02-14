export function CardElement(card) {
  return `<img src="src/Assets/card/${(card.card_images[0]) ? card.id : "cardBack"}.jpg" alt="${card.name}">`
}