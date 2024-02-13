export function CardElement(card, img_href) {
  return `<img src="${img_href}/${card.id}.jpg" alt="${card.name}">`
}