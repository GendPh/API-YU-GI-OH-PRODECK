export let fetchApi = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Http error! Status: ${response.status}`)
  }
  const json = await response.json();
  const data = json.data;
  return data;
}

export async function fetchBanList(array) {
  let tcgVBanList = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&";
  let ocgVBanList = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=ocg&";
  let tcg = await fetchApi(tcgVBanList)
  let ocg = await fetchApi(ocgVBanList)

  tcg.forEach(card => {
    if (card.banlist_info.ban_tcg == "Banned") {
      array.tcg.Banned.push(card);
    }
    if (card.banlist_info.ban_tcg == "Limited") {
      array.tcg.Limited.push(card);
    }
    if (card.banlist_info.ban_tcg == "Semi-Limited") {
      array.tcg.SemiLimited.push(card);
    }
  });
  ocg.forEach(card => {
    if (card.banlist_info.ban_ocg == "Banned") {
      array.ocg.Banned.push(card);
    }
    if (card.banlist_info.ban_ocg == "Limited") {
      array.ocg.Limited.push(card);
    }
    if (card.banlist_info.ban_ocg == "Semi-Limited") {
      array.ocg.SemiLimited.push(card);
    }
  });
}