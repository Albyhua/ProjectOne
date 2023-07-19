console.log("hello")
function searchRecipes(searchTerm) {
    const appId = '3d90a8ed'; // ID for Edamam API
    const appKey = '8f7344a214663e76c93da727131ce2ac'; // App key for Edamam API

    const searchApiUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;
    const nutritionApiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}`;
    const autocompleteApiUrl = `https://api.edamam.com/auto-complete?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;

    // This performs the recipe search request
    const searchRequest = fetch(searchApiUrl).then((response) => response.json());
// check to make sure that you are using the API calls correctly(line 11,14)
    // This performs the nutrition analysis request
    const nutritionRequest = fetch(nutritionApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingr: [searchTerm],
        }),
        // check the API documentation for correct method for Edamam. READ it
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

}
function displayNutritionData(nutritionData) {
    // Code to display the nutrition data on the page

}

function displayAutocompleteSuggestions(suggestions) {
    // Code to display the autocomplete 

}

const searchInput = document.getElementById('search-input');
let timeoutId;
const searchValue = document.getElementById('search-value')
// What is this Timeout for?
searchInput.addEventListener('click', function() {
    clearTimeout(timeoutId);
console.log ("hello")
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 1) {
        timeoutId = setTimeout(() => {
            searchRecipes(searchTerm);
        }, 500);
    }
});




const track = document.getElementById("food-track");

// window.onmousedown = e => {
//     track.dataset.mouseDownAt = e.clientX;
// }

// window.onmouseup = () => {
//     track.dataset.mouseDownAt = "0";
//     track.dataset.prevPercentage = track.dataset.percentage;
// }

// window.onmousemove = e => {
//     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
//         maxDelta = window.innerWidth / 2;

//     const percentage = (mouseDelta / maxDelta) * -100,
//         nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage

//     Math.min(nextPercentage, 0);
//     Math.max(nextPercentage, -100);

//     track.dataset.percentage = nextPercentage;

//     track.style.transform = `translate(${percentage}%, -50%)`;

//     for (const image of track.getElementsByClassName("image")) {
//         image.style.objectPosition = `${nextPercentage + 100}% 50%`
//     }

//     track.animate({
//         transform: `translate(${nextPercentage}%, -50%)`
//     }, { duration: 1200, fill: "forwards" });


//     image.animate({
//         objectPosition: `${100 + nextPercentage}% center`
//     }, { duration: 1200, fill: "forwards" });
// }
