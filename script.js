const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const recipeListElement = document.getElementById('recipe-list');
const recipeDetailsElement = document.getElementById('recipe-details');
const autocompleteListElement = document.getElementById('autocomplete-list');
const historyBlock = document.getElementById('history-block');

let searchHistory = [];

searchForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', handleInputChange);

function handleFormSubmit(event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        searchRecipes(searchTerm);
    }
}

function handleInputChange() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        autocompleteSearch(searchTerm);
    } else {
        clearAutocompleteList();
    }
}

function searchRecipes(searchTerm) {
    fetch(`https://api.edamam.com/api/recipes/v2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'app_id': '3d90a8ed', 
            'app_key': 'a0d37f1dc6853215adb58e3a7e45f9d5' 
        },
        params: {
            q: searchTerm
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.hits);
        saveSearchToHistory(searchTerm);
    })
    .catch(error => {
        console.log('An error occurred:', error);
    });
}

function displayRecipes(recipes) {
    // Clear previous search results
    recipeListElement.innerHTML = '';

    // Iterate through the recipes and create a recipe element for each
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.textContent = recipe.recipe.label;

        // Add a click event listener to show recipe details when clicked
        recipeElement.addEventListener('click', () => {
            showRecipeDetails(recipe.recipe);
        });

        // Append the recipe element to the recipe list
        recipeListElement.appendChild(recipeElement);
    });
}

function showRecipeDetails(recipe) {
    // Clear previous recipe details
    recipeDetailsElement.innerHTML = '';

    // Create elements for the recipe details
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = recipe.label;

    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.textContent = 'Ingredients';

    const ingredientsList = document.createElement('ul');
    recipe.ingredientLines.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });

    const stepsTitle = document.createElement('h3');
    stepsTitle.textContent = 'Steps';

    const stepsList = document.createElement('ol');
    recipe.steps.forEach((step, index) => {
        const stepItem = document.createElement('li');
        stepItem.textContent = `Step ${index + 1}: ${step}`;
        stepsList.appendChild(stepItem);
    });

    // Append the elements to the recipe details
    recipeDetailsElement.appendChild(recipeTitle);
    recipeDetailsElement.appendChild(ingredientsTitle);
    recipeDetailsElement.appendChild(ingredientsList);
    recipeDetailsElement.appendChild(stepsTitle);
    recipeDetailsElement.appendChild(stepsList);
}

function autocompleteSearch(searchTerm) {
    // Clear previous autocomplete suggestions
    clearAutocompleteList();

    // Make an API call to fetch autocomplete suggestions
   
}

function displayAutocompleteSuggestions(suggestions) {
    // Create elements for the autocomplete suggestions
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-item');
        suggestionItem.textContent = suggestion;

        // Add a click event listener to set the suggestion as the search input value
        suggestionItem.addEventListener('click', () => {
            searchInput.value = suggestion;
            handleFormSubmit(event); // Perform search when suggestion is clicked
            clearAutocompleteList(); // Clear the autocomplete list after search
        });

        // Append the suggestion element to the autocomplete list
        autocompleteListElement.appendChild(suggestionItem);
    });
}

function clearAutocompleteList() {
    autocompleteListElement.innerHTML = '';
}

function saveSearchToHistory(searchTerm) {
    searchHistory.push(searchTerm);
    // Update the historyBlock element with the search history
    historyBlock.innerHTML = '';
    searchHistory.forEach(search => {
        const searchItem = document.createElement('div');
        searchItem.classList.add('searchItem');
        searchItem.textContent = search;
        historyBlock.appendChild(searchItem);
    });
}
