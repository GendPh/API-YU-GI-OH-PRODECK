        ---- Load All Cards ----
Module Imports: The code imports necessary functions (FetchApi, GetValueFromURL, paginateObject) from the FetchApi.js module and the LoadCards function from the CreateCard.js module.

LoadAllCards Function: This asynchronous function loads all cards based on the parameters present in the URL. It retrieves the page number, archetype, type, and race from the URL query parameters. Then, it constructs a URL using these parameters to fetch card data from the Yu-Gi-Oh! Pro Deck API. After fetching the data, it paginates it and loads the appropriate page of cards into the designated container on the webpage.

LoadButtons Function: This function dynamically creates pagination buttons based on the paginated data. It sets the active state for the current page button and ensures that the active button is scrolled into view, centered within its container.

CreateButtons Function: This function creates individual pagination buttons as anchor elements (<a>), setting their href, title, and text content accordingly.

Initialization: Finally, the LoadAllCards function is called when the page loads to populate the page with the appropriate cards and pagination buttons based on the URL parameters.


        ----Search Config Information----
Imports: Imports FetchApi and LoadCards from their respective modules.

Form Submission Handling: The handleSubmit function is an asynchronous function that handles form submission events. It prevents the default form submission behavior.

HTML Generation: It generates HTML for a loading state and an error message state. This HTML is inserted into the container element.

Getting Search Term: It retrieves the search term from the input field.

Fetching Data: It constructs a URL with the search term and uses the FetchApi function to fetch data from the API.

Handling Result: If there's no error in the fetched data, it slices the data to get the first 20 results and then passes it to LoadCards function to render them in the UI.

Handling Empty Search Term: If the search term is empty, it hides the container.

Event Listeners: It adds event listeners to the form for both submission and input events, both of which call the handleSubmit function.

        ---- Select Config Information ----
Module Imports: The code imports necessary functions (FetchApi and GetValueFromURL) from the FetchApi.js module. These functions are used for fetching data from an API and extracting values from the URL parameters.

Select Element Containers: Three variables (archetypeSelectContainer, typeSelectContainer, and raceSelectContainer) are initialized to reference select elements in the HTML with corresponding IDs.

Type and Race Arrays: Arrays type_array and race_array are defined to hold options for different types and races of Yu-Gi-Oh! cards, grouped into categories.

LoadSelectOptionsArchetype Function: This asynchronous function fetches archetype options from an external API and populates the archetype_select element with these options. It also checks the URL for an existing archetype parameter and selects the corresponding option if found.

LoadSelectOptions Function: This function loads options into the select elements based on the provided array and filter. It creates option elements for each option in the array, grouping them under their respective categories using optgroup elements. It also checks the URL for an existing parameter and selects the corresponding option if found.

Loading Select Options: The archetype options are loaded using LoadSelectOptionsArchetype, while options for types and races are loaded using LoadSelectOptions.

HandleSelectedChange Function: This function handles the change event for the select elements. When a user selects an option, it updates the URL parameters accordingly. If the selected value is not empty, it sets the parameter in the URL; otherwise, it removes the parameter from the URL. Finally, it reloads the page with the updated URL.

Event Listeners: Event listeners are added to each select element to trigger the HandleSelectedChange function when the user selects an option.

        ---- Get Card Information ----
Module Imports: Importing necessary functions from external modules for fetching data from an API and creating card elements.
Card ID Extraction: Extracting the card ID from the URL parameters.
API URL: Defining the URL for fetching card information.
LoadCardInfo Function: Asynchronously loading card information based on the extracted card ID. It updates the DOM elements with the fetched card data and handles the display of related cards.
DOM Element References: Objects containing references to various DOM elements for updating with card information.
Rendering Card Sets: Rendering information about card sets associated with the current card, including links and prices.
Fetching and Displaying Related Cards: Fetching related cards based on the archetype of the current card, shuffling them, selecting a subset, and rendering them in the DOM.
Page Initialization: Calling the LoadCardInfo function when the page loads to initiate the card information loading process.