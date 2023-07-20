



const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const recipeListElement = document.getElementById('recipe-list');
const recipeDetailsElement = document.getElementById('recipe-details');
const autocompleteListElement = document.getElementById('autocomplete-list');
const historyBlock = document.getElementById('history-block');
const startBtn = document.getElementById('startBtn');
const title = document.getElementById('titleScreen');
const header = document.getElementById('header');
const mainPage = document.getElementById('mainPage');
const recipePage = document.getElementById('recipe');
const backBtn = document.getElementById('backBtn')
const apiKey = 'a0d37f1dc6853215adb58e3a7e45f9d5'; 
const appId = '3d90a8ed'; 

const autocompleteSuggestions = [
  'Chicken',
  'Salad',
  'Smoothie',
  'Burger',
  'Ice Cream',
  'Pineapple',
  'Strawberry',
];

let searchHistory = [];

searchForm.addEventListener('submit', handleFormSubmit);
// searchInput.addEventListener('input', handleInputChange);

function handleFormSubmit(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  console.log(searchTerm)
  if (searchTerm.length > 0) {
    searchRecipes(searchTerm);
    saveSearchToHistory(searchTerm);
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
  var URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=3d90a8ed&app_key=${apiKey}`
  console.log(URL)
  fetch(URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
      .then(response => response.json())
      .then(data => {
        console.log(data)
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
    const nameElement = document.createElement("h3");
    const imgElement = document.createElement("img");

    
    imgElement.setAttribute("src", recipe.recipe.image);
    imgElement.setAttribute("alt", "food image");
    imgElement.classList.add('image');
    console.log(recipe);
    recipeElement.classList.add('recipe','searchBlock','boxes','box','is-justify-content-space-around','m-2');
    nameElement.textContent = recipe.recipe.label;

    // Add a click event listener to show recipe details when clicked
    recipeElement.addEventListener('click', () => {
      showRecipeDetails(recipe.recipe);
    });

    // Append the recipe element to the recipe list
    recipeElement.appendChild(imgElement);
    recipeElement.appendChild(nameElement);
    recipeListElement.appendChild(recipeElement);
  });
}

function showRecipeDetails(recipe) {
  // Clear previous recipe details
  //recipeDetailsElement.innerHTML = '';
  mainPage.classList.add('is-hidden');
  recipePage.classList.remove('is-hidden');
  backBtn.classList.remove('is-hidden');
  console.log(recipe)
  // Create elements for the recipe details
  const recipeTitle = document.getElementById('recipeTitle');
  recipeTitle.textContent = recipe.label;
  recipeTitle.classList.add('HHH')
  const imgEl = document.getElementById("recimage")
  // imgEl.setAttribute("src",recipe.images.REGULAR.url)
  imgEl.setAttribute("src",recipe.image)

  const ingredientsList = document.getElementById('ingredents');
  recipe.ingredientLines.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  });

  const stepsTitle = document.createElement('h3');
  stepsTitle.textContent = 'Steps';

  const stepsList = document.createElement('ol');
  recipe.ingredients.forEach((ing, index) => {
    const stepItem = document.createElement('li');
    stepItem.textContent = `ingredients ${index + 1}: ${ing.text} - ${ing.quantity}`;
    stepsList.appendChild(stepItem);
  });
  console.log(recipeDetailsElement)
  // Append the elements to the recipe details
  // recipeDetailsElement.innerHTML = ""
  // recipeDetailsElement.appendChild(recipeTitle);
  // recipeDetailsElement.appendChild(imgEl)
  // recipeDetailsElement.appendChild(ingredientsTitle);
  // recipeDetailsElement.appendChild(stepsList);
  // recipeDetailsElement.appendChild(stepsTitle);
  // recipeDetailsElement.appendChild(ingredientsList);
  showNutritionDetails(recipe);
}

function showNutritionDetails(recipe) {
  // Create elements for the nutrition facts
  const nutritionBox = document.getElementsByClassName('nutrition');
  const nutritionList = document.getElementById('nutritionList');

  const diet = recipe.totalNutrients;
  for (let nutrient in diet) {
    const nutrientItem = document.createElement('li');
    nutrientItem.textContent = `${diet[nutrient].label}: ${Math.round(diet[nutrient].quantity)} ${diet[nutrient].unit}`;
    nutritionList.appendChild(nutrientItem);
  }

  // Append the elements to the recipe details
  nutritionBox.appendChild(nutritionList);
}

function autocompleteSearch(searchTerm) {
  // Clear previous autocomplete suggestions
  clearAutocompleteList();

  // Filter the suggestions based on the search term
  const filteredSuggestions = autocompleteSuggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  displayAutocompleteSuggestions(filteredSuggestions);
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


startBtn.addEventListener('click',function(event){
  event.preventDefault();
  title.classList.add('is-hidden');
  mainPage.classList.remove('is-hidden');
  header.classList.remove('is-hidden');
  console.log('hi');
});

backBtn.addEventListener('click',function(event){
  event.preventDefault();
  recipePage.classList.add('is-hidden');
  mainPage.classList.remove('is-hidden');
  backBtn.classList.add('is-hidden');
})



