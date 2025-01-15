const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

const SPOONACULAR_API_KEY = 'c307e9bf0d7b47dc82fc3d4ccf883754';

//fetch recipes from server
const fetchRecipes = async (query) => {
    const apiUrl = `http://localhost:4000/api/recipes?q=${query}`;
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if(data.results && Array.isArray(data.results)) {
            console.log(data);
            console.log(data.results);
            displayRecipes(data.results);
        } else {
            console.log('No meals found or incorrect response format.');
        }

        console.log(data);
        //function call to display meals
        //displayRecipes(data.meals);
       // res.json(data);
        console.log(data.results);
    } catch(error) {
        console.error('Error fetching recipes',error);
        resultsDiv.innerHTML = '<p>Error fetching recipes.Please try again.</p>'
    }
}

function displayRecipes(recipes) {
    resultsDiv.innerHTML = '';

    if(!recipes || recipes.length === 0) {
        console.log('No recipes found.');
        resultsDiv.innerHTML = '<p>No recipes found.</p>'
        return;
    }

    //loop 
    recipes.forEach((recipe) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <div class="food-grid">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="fetchRecipeDetails(${recipe.id})">View Recipes</button>
        </div>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
};

async function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        displayRecipeDetails(data);
    }catch(error) {
        console.error('err', error);
    }
}

function displayRecipeDetails(recipe) {
    resultsDiv.innerHTML = `
     <div class="recipe-card">
       <div class="recipe-part1">
        <div class="left">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h2>${recipe.title}</h2>
        </div>
        <div class="right">
        <p><strong>Cooking time:</strong>${recipe.readyInMinutes} minutes.</p>
        <p><strong>Cuisines:</strong>${recipe.cuisines.join(', ')}</p>
        <p><strong>Servings: </strong>${recipe.servings}</p>
        <p><strong>Dish Summary: </strong>${recipe.summary}</p>
        </div>
       </div>
       <div class="recipe-part2">
        <p><strong>Ingredients: </strong></p>
        <ul>
            ${recipe.extendedIngredients.map((ingredient) => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <br><br>
        <p><strong>Instructions: </strong></p>
        <ul>
            <li>
                ${recipe.instructions || 'No instructions.'}
            </li>
        </ul>
        <button onclick="location.reload()" class="backToSearchBtn">Back to search</button>
       </div>
    </div>
    `
}


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if(query) {
        fetchRecipes(query)
    }
});