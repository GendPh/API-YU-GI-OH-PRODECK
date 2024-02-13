export function CardElement(card) {
  return `<img src="src/Assets/card/${(card.card_images) ? card.id : "cardBack"}.jpg" alt="${card.name}">`
}
export function SetCard(setCard) {
  const img = (setCard.set_image) ? setCard.set_code : "cardBack";
  return `
    <figure>
      <img src="./src/Assets/setCards/${img}.jpg" alt="${setCard.set_name}" class="w-full h-full object-contain">
    </figure>
    <div class="bg-secondary uppercase p-2">
      <p class="font-bold text-center">
        <a href="#">${setCard.set_name}</a>
      </p>
    </div>
`
}