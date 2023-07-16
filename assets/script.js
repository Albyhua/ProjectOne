function searchRecipes(searchTerm) {
    const appId = '3d90a8ed'; // ID for Edamam API
    const appKey = '8f7344a214663e76c93da727131ce2ac'; // App key for Edamam API

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




const track = document.getElementById("food-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.percentage = track.dataset.percentage || "0";
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt !== "0") {
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;

        let percentage = (mouseDelta / maxDelta) * -100,
            nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage

        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, -100);

        track.dataset.percentage = nextPercentage;

        track.style.transform = `translate(${nextPercentage}%, -50%)`;

        for (const image of track.getElementsByClassName("image")) {
            image.style.objectPosition = `${nextPercentage + 100}% 50%`;
            
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
    }
}


// const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

// const handleOnUp = () => {
//     track.dataset.mouseDownAt = "0";
//     track.dataset.prevPercentage = track.dataset.percentage;
// }

// const handleOnMove = e => {
//     if (track.dataset.mouseDownAt === "0") return;

//     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
//         maxDelta = window.innerWidth / 2;

//     const percentage = (mouseDelta / maxDelta) * -100,
//         nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
//         nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//     track.dataset.percentage = nextPercentage;

//     track.animate({
//         transform: `translate(${nextPercentage}%, -50%)`
//     }, { duration: 1200, fill: "forwards" });

//     for (const image of track.getElementsByClassName("image")) {
//         image.animate({
//             objectPosition: `${100 + nextPercentage}% center`
//         }, { duration: 1200, fill: "forwards" });
//     }
// }

// window.onmousedown = e => handleOnDown(e);

// window.ontouchstart = e => handleOnDown(e.touches[0]);

// window.onmouseup = e => handleOnUp(e);

// window.ontouchend = e => handleOnUp(e.touches[0]);

// window.onmousemove = e => handleOnMove(e);

// window.ontouchmove = e => handleOnMove(e.touches[0]);