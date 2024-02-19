// Importing necessary modules
import { FetchApi, GetValueFromURL } from "../src/API/FetchApi.js";

// Getting containers for select elements
const archetypeSelectContainer = document.getElementById("archetype_select");
const typeSelectContainer = document.getElementById("type_select");
const raceSelectContainer = document.getElementById("race_select");

// Arrays containing types and races
const type_array = [
  { Main: ["Effect Monster", "Flip Effect Monster", "Flip Tuner Effect Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Pendulum Effect Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Ritual Effect Monster", "Ritual Monster", "Spell Card", "Spirit Monster", "Toon Monster", "Trap Card", "Tuner Monster", "Union Effect Monster"] },
  { Extra: ["Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster", "XYZ Monster", "XYZ Pendulum Effect Monster"] },
  { Other: ["Skill Card", "Token"] }
];
const race_array = [
  { Monster: ["Aqua", " Beast", " Beast - Warrior", " Creator - God", " Cyberse", " Dinosaur", " Divine - Beast", " Dragon", " Fairy", " Fiend", " Fish", " Insect", " Machine", " Plant", " Psychic", " Pyro", " Reptile", " Rock", " Sea Serpent", " Spellcaster", " Thunder", " Warrior", " Winged Beast", " Wyrm", " Zombie"], },
  { "Spell Cards": ["Normal", " Field", " Equip", " Continuous", " Quick - Play", " Ritual"], },
  { Trap: ["normal", " continuous", " counter"] },
];

// Function to load archetype options
async function LoadSelectOptionsArchetype(url) {
  const archetypes = await FetchApi(url);
  const archetype = GetValueFromURL("archetype");
  const selectContainer = document.getElementById("archetype_select");
  archetypes.forEach(arch => {
    const option = document.createElement("option");
    option.value = arch.archetype_name;
    option.textContent = arch.archetype_name;
    if (archetype == arch.archetype_name) {
      option.selected = true;
    }
    selectContainer.appendChild(option);
  });
}

// Function to load select options from arrays
function LoadSelectOptions(container, array, filter) {
  const type = GetValueFromURL(filter);
  array.forEach(group => {
    // Iterate over the keys (group names) of each object
    for (let groupName in group) {
      const optionGroup = document.createElement("optgroup");
      optionGroup.label = groupName;

      // Iterate over the values (array of options) for each group
      group[groupName].forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        if (type === optionText) {
          option.selected = true;
        }
        optionGroup.appendChild(option);
      });

      container.appendChild(optionGroup);
    }
  });
}

// Load options for archetype select
LoadSelectOptionsArchetype("https://db.ygoprodeck.com/api/v7/archetypes.php");

// Load options for type and race selects
LoadSelectOptions(typeSelectContainer, type_array, "type");
LoadSelectOptions(raceSelectContainer, race_array, "race");

// Function to handle select change events and update URL
function HandleSelectedChange(container, id) {
  // Get the selected value of the select element
  const selectedValue = container.value;

  // Update the URL with the selected value
  const url = new URL(window.location.href);
  url.searchParams.set('page', '1');

  // If the selected value is not empty, set the parameter in the URL
  if (selectedValue.trim() !== '') {
    url.searchParams.set(id, selectedValue);
  } else {
    // If the selected value is empty, remove the parameter from the URL
    url.searchParams.delete(id);
  }

  // Reload the page with the updated URL
  window.location.href = url.toString();
}

// Add event listeners to select elements for change events
archetypeSelectContainer.addEventListener("change", () => { HandleSelectedChange(archetypeSelectContainer, "archetype") });
typeSelectContainer.addEventListener("change", () => { HandleSelectedChange(typeSelectContainer, "type") });
raceSelectContainer.addEventListener("change", () => { HandleSelectedChange(raceSelectContainer, "race") });
