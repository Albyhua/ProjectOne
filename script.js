const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const recipeListElement = document.getElementById('recipe-list');
const recipeDetailsElement = document.getElementById('recipe-details');
const autocompleteListElement = document.getElementById('autocomplete-list');

let searchHistory = [];

searchForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 0) {
    searchRecipes(searchTerm);
  }
}

function searchRecipes(searchTerm) {
  fetch('https://api.edamam.com/search', {
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
    // This processes the recipe search results 
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
    recipeElement.textContent = recipe.label;

    // Add a click event listener to show recipe details when clicked
    recipeElement.addEventListener('click', () => {
      showRecipeDetails(recipe);
    });

    // Append the recipe element to the recipe list
    recipeListElement.appendChild(recipeElement);
  });
}