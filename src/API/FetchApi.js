/* 
  Information:{
    you can sort choosing the options like: &sort=name etc;
    you can choose by level like: &level=4 etc;
    you can choose by attribute like: &attribute=dark etc;
    you can choose by card set like: &cardset=metal%20raiders etc;

    - you can choose by race like: &race=spellcaster etc;
    Parameter race values{
      monster:[Aqua, Beast, Beast-Warrior, Creator-God, Cyberse, Dinosaur, Divine-Beast, Dragon, Fairy, Fiend, Fish, Insect, Machine, Plant, Psychic, Pyro, Reptile, Rock, Sea Serpent, Spellcaster, Thunder, Warrior, Winged Beast, Wyrm, Zombie],
      Spell Cards: [Normal, Field, Equip, Continuous, Quick-Play, Ritual],
      Trap: [normal, continuous, counter],
    } 

    - you can choose by type like: &type=spell etc;
    Parameter type values{
      Main Deck Types: [Effect Monster, Flip Effect Monster, Flip Tuner Effect Monster, Gemini Monster, Normal Monster, Normal Tuner Monster, Pendulum Effect Monster, Pendulum Effect Ritual Monster, Pendulum Flip Effect Monster, Pendulum Normal Monster, Pendulum Tuner Effect Monster, Ritual Effect Monster, Ritual Monster, Spell Card, Spirit Monster, Toon Monster, Trap Card, Tuner Monster, Union Effect Monster],
      Extra Deck Types: [Fusion Monster, Link Monster, Pendulum Effect Fusion Monster, Synchro Monster, Synchro Pendulum Effect Monster, Synchro Tuner Monster, XYZ Monster, XYZ Pendulum Effect Monster,Skill Card, Token],
      Other Types: [Skill Card, Token],
    }

    you can choose by containing a name like: &fname=Wizard etc;
    you can choose by link marker position like: &linkmarker=top etc;
    you can choose by date like: &startdate=2000-01-01&enddate=2002-08-23 etc;
  }

  API End Points
  All Cards: "https://db.ygoprodeck.com/api/v7/cardinfo.php";
  Card ID: "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=1861630";
  Card Archetypes: "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes";
  Get all Level 4/RANK 4 Water cards and order by atk:"https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk"
  Get Ban list (tcg or ocg): "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4&sort=name"
  Get Speed Duel: "https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed Duel"
  Get Random Card: "https://db.ygoprodeck.com/api/v7/randomcard.php"
  !FAILED Get Rush Duel: "https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Rush%20Duel"
  Get All Card Sets:"https://db.ygoprodeck.com/api/v7/cardsets.php";
  Get Card Set Info:"https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=SDY-046";
  Get All Archetypes:"https://db.ygoprodeck.com/api/v7/archetypes.php";
*/

export const FetchApi = async (url) => {
  try {
    const response = await fetch(url);;
    if (!response.ok) {
      return { error: "No Cards Collected!" }
    }
    return await response.json();
  } catch (er) {
    return { error: "No Cards Collected!" }
  }
}


export function GetValueFromURL(parameterName) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(parameterName);

  // Ensure value is not null and is properly sanitized
  if (value !== null && value.length > 0) {
    return value;
  } else {
    // If the value is null or contains invalid characters, return a default value or handle the error appropriately
    return { error: new Error('Invalid value') };
  }
}


export function paginateObject(array, itemsPerPage) {
  const totalPages = Math.ceil(array.length / itemsPerPage);
  const paginatedArray = [];

  for (let i = 0; i < totalPages; i++) {
    const startIndex = i * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageArray = array.slice(startIndex, endIndex);
    paginatedArray.push(pageArray);
  }

  return paginatedArray;

}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}