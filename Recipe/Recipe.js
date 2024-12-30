const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const ViewFavoritesBtn = document.querySelector('#wishlistIcon');
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Load favorites

// Fetch Recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        if (!response.meals) {
            recipeContainer.innerHTML = "<h2>No recipes found!</h2>";
            return;
        }

        response.meals.forEach(meal => {
            const recipeDiv = createRecipeCard(meal);
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<h2>Error fetching recipes. Try again later.</h2>";
    }
};

// Create Recipe Card
const createRecipeCard = (meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
    `;

    // Favorite heart icon
    const favicon = document.createElement("div");
    favicon.innerHTML = `<i class="fas fa-heart heart-icon"></i>`;
    favicon.style.color = favorites.some(fav => fav.idMeal === meal.idMeal) ? "red" : "black";

    // Toggle favorite status
    favicon.addEventListener('click', () => {
        toggleFavorite(meal, favicon);
    });
    recipeDiv.appendChild(favicon);

    // View Recipe Button
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    button.addEventListener('click', () => {
        openRecipePopup(meal);
    });
    recipeDiv.appendChild(button);

    return recipeDiv;
};

// Toggle Favorite Status
const toggleFavorite = (meal, icon) => {
    const index = favorites.findIndex(fav => fav.idMeal === meal.idMeal);
    if (index !== -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        icon.style.color = "black";
        alert("Removed from wishlist.");
    } else {
        // Add to favorites
        favorites.push(meal);
        icon.style.color = "red";
        alert("Added to wishlist!");
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Fetch Ingredients
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else break;
    }
    return ingredientsList;
};

// Open Recipe Popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// Close Popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

// Search Button
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

// View Favorites
ViewFavoritesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayFavorites();
});

// Display Favorites
const displayFavorites = () => {
    recipeContainer.innerHTML = "";
    if (favorites.length === 0) {
        recipeContainer.innerHTML = "<h2>No favorites yet!</h2>";
        return;
    }

    favorites.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
        `;

        // Heart icon for removing from favorites
        const favicon = document.createElement("div");
        favicon.innerHTML = `<i class="fas fa-heart heart-icon" style="color:red;"></i>`;
        favicon.style.cursor = "pointer";

        // Remove item on click
        favicon.addEventListener('click', () => {
            favorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            recipeDiv.remove(); // Remove from DOM
            alert("Favorite item has been removed.");
        });

        recipeDiv.appendChild(favicon);

        // View Recipe Button
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
        recipeDiv.appendChild(button);

        recipeContainer.appendChild(recipeDiv);
    });
};

                
                     
                
          
              
                
          
          
          
          
          
          
              
                      
          
                      
              
          