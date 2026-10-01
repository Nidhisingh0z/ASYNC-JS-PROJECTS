const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const recipeContainer = document.getElementById("recipeContainer");

searchBtn.addEventListener("click", searchRecipe);

function searchRecipe() {

    const searchValue = searchInput.value.trim();

    // Empty input check
    if (searchValue === "") {
        message.textContent = "Please enter a recipe name.";
        recipeContainer.innerHTML = "";
        return;
    }

    message.textContent = "Loading...";
    recipeContainer.innerHTML = "";

    // API call
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchValue)}`)
        .then(response => response.json())
        .then(data => {

            recipeContainer.innerHTML = "";

            // No recipe found
            if (!data.meals) {
                message.textContent = "No recipe found.";
                return;
            }

            message.textContent = `${data.meals.length} recipe(s) found.`;

            // Create cards
            data.meals.forEach(recipe => {

                const card = document.createElement("div");
                card.classList.add("cards");

                card.innerHTML = `
                    <img 
                        src="${recipe.strMealThumb}" 
                        alt="${recipe.strMeal}"
                    >

                    <div class="recipeContent">

                        <h2>${recipe.strMeal}</h2>

                        <p>
                            <strong>Category:</strong>
                            ${recipe.strCategory}
                        </p>

                        <p>
                            <strong>Area:</strong>
                            ${recipe.strArea}
                        </p>

                        <button class="viewRecipe">
                            View Recipe
                        </button>

                    </div>
                `;

                // Button click
                const viewRecipeBtn = card.querySelector(".viewRecipe");

                viewRecipeBtn.addEventListener("click", () => {
                    showRecipe(recipe);
                });

                recipeContainer.appendChild(card);
            });
        })
        .catch(error => {

            console.log(error);
            message.textContent = "Something went wrong. Please try again.";

        });
}


// Show complete recipe
function showRecipe(recipe) {

    recipeContainer.innerHTML = `
        <div class="cards">

            <img 
                src="${recipe.strMealThumb}" 
                alt="${recipe.strMeal}"
            >

            <div class="recipeContent">

                <h2>${recipe.strMeal}</h2>

                <p>
                    <strong>Category:</strong>
                    ${recipe.strCategory}
                </p>

                <p>
                    <strong>Area:</strong>
                    ${recipe.strArea}
                </p>

                <p>
                    <strong>Instructions:</strong>
                    ${recipe.strInstructions}
                </p>

                <button id="backBtn">
                    Back
                </button>

            </div>

        </div>
    `;

    document.getElementById("backBtn").addEventListener("click", searchRecipe);
}