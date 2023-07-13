function searchRecipes(searchTerm) {
    const appId = '3d90a8ed'; // ID for Edamam API
    const appKey = '8f7344a214663e76c93da727131ce2ac'; // App key for Edamam APIaut
  
    const searchApiUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;
    const nutritionApiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}`;
    const autocompleteApiUrl = `https://api.edamam.com/auto-complete?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;
  
    // This performs the recipe search request
    const searchRequest = fetch(searchApiUrl).then((response) => response.json());
  
    // This performs the nutrition analysis request
    const nutritionRequest = fetch(nutritionApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingr: [searchTerm],
      }),
    }).then((response) => response.json());
  
    // This performs the autocomplete request
    const autocompleteRequest = fetch(autocompleteApiUrl).then((response) => response.json());
  
    Promise.all([searchRequest, nutritionRequest, autocompleteRequest])
      .then((data) => {
        const recipes = data[0].hits;
        const nutritionData = data[1];
        const autocompleteSuggestions = data[2];
        displayRecipes(recipes);
        displayNutritionData(nutritionData);
        displayAutocompleteSuggestions(autocompleteSuggestions);
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
  }
  
  function displayRecipes(recipes) {
    // Code to display the recipe data on the page
    const apiDataElement = document.getElementById('api-recipe-data');
    apiDataElement.textContent = recipes;
    console.log(recipes)
    
  }
  function displayNutritionData(nutritionData) {
    // Code to display the nutrition data on the page
    
  }
  
  function displayAutocompleteSuggestions(suggestions) {
    // Code to display the autocomplete 
    
  }
  
  const searchInput = document.getElementById('search-input');
  let timeoutId;
  
  searchInput.addEventListener('input', (event) => {
    clearTimeout(timeoutId);
  
    const searchTerm = event.target.value.trim();
    if (searchTerm.length > 1) {
      timeoutId = setTimeout(() => {
        searchRecipes(searchTerm);
      }, 500);
    }
  });
  