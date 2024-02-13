export function CardElement(card) {
  return `<img src="src/Assets/card/${(card.id) ? card.id : "cardBack"}.jpg" alt="${card.name}">`
}