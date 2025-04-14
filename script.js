// Mock recipe data
const recipes = [
    {
        "id": "recipe1",
        "title": "Delicious Chocolate Cake",
        "image": "chocolate-cake.jpg",
        "ingredients": [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "¾ cup unsweetened cocoa powder",
            "1 ½ teaspoons baking powder",
            "1 ½ teaspoons baking soda",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "½ cup vegetable oil",
            "2 large eggs",
            "1 teaspoon vanilla extract",
            "1 cup boiling water"
        ],
        "instructions": [
            "Preheat oven to 350°F (175°C). Grease and flour a 9x13 inch baking pan.",
            "In a large bowl, whisk together the flour, sugar, cocoa powder, baking powder, baking soda, and salt.",
            "Add the buttermilk, oil, eggs, and vanilla extract. Beat on medium speed for 2 minutes.",
            "Stir in the boiling water (the batter will be thin).",
            "Pour the batter into the prepared pan and bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.",
            "Let the cake cool completely before frosting."
        ]
    },
    {
        "id": "recipe2",
        "title": "Simple Tomato Pasta",
        "image": "tomato-pasta.jpg",
        "ingredients": [
            "1 pound pasta",
            "1 (28 ounce) can crushed tomatoes",
            "2 cloves garlic, minced",
            "¼ cup olive oil",
            "1 teaspoon dried oregano",
            "Salt and pepper to taste",
            "Fresh basil leaves, for garnish"
        ],
        "instructions": [
            "Cook pasta according to package directions.",
            "While the pasta is cooking, heat olive oil in a large saucepan over medium heat.",
            "Add garlic and cook until fragrant, about 1 minute.",
            "Stir in crushed tomatoes, oregano, salt, and pepper.",
            "Bring to a simmer and cook for 10-15 minutes, stirring occasionally.",
            "Drain the pasta and add it to the sauce. Toss to coat.",
            "Garnish with fresh basil leaves and serve."
        ]
    },
    {
        "id": "recipe3",
        "title": "Quick Chicken Stir-Fry",
        "image": "chicken-stir-fry.jpg",
        "ingredients": [
            "1 pound boneless, skinless chicken breasts, cut into strips",
            "1 tablespoon soy sauce",
            "1 teaspoon cornstarch",
            "1 tablespoon vegetable oil",
            "1 onion, sliced",
            "2 cloves garlic, minced",
            "1 bell pepper (any color), sliced",
            "1 cup broccoli florets",
            "2 tablespoons stir-fry sauce"
        ],
        "instructions": [
            "In a bowl, toss chicken with soy sauce and cornstarch.",
            "Heat vegetable oil in a large skillet or wok over medium-high heat.",
            "Add chicken and cook until browned and cooked through.",
            "Remove chicken from skillet and set aside.",
            "Add onion and garlic to the skillet and cook until softened, about 2 minutes.",
            "Add bell pepper and broccoli and cook for another 3-5 minutes until crisp-tender.",
            "Return chicken to the skillet and stir in the stir-fry sauce. Cook until heated through.",
            "Serve hot over rice or noodles."
        ]
    },
    {
        "id": "recipe4",
        "title": "Classic Margherita Pizza",
        "image": "margherita-pizza.jpg",
        "ingredients": [
            "1 pre-made pizza dough",
            "½ cup tomato sauce",
            "8 ounces fresh mozzarella cheese, sliced",
            "Fresh basil leaves",
            "Olive oil"
        ],
        "instructions": [
            "Preheat oven to 450°F (232°C).",
            "Stretch or roll out the pizza dough to your desired thickness.",
            "Spread tomato sauce evenly over the dough, leaving a small border.",
            "Arrange mozzarella slices over the sauce.",
            "Bake for 12-15 minutes, or until the crust is golden brown and the cheese is melted and bubbly.",
            "Remove from oven and garnish with fresh basil leaves. Drizzle with olive oil before serving."
        ]
    }
    // You can add even more recipes here!
];

const recipeListDiv = document.getElementById('recipe-list');
const recipeDetailDiv = document.getElementById('recipe-detail');
const addRecipeDiv = document.getElementById('add-recipe');
const addRecipeButton = document.getElementById('add-recipe-button');
const newRecipeForm = document.getElementById('new-recipe-form');
let nextRecipeId = recipes.length + 1; // Simple way to generate a new ID

// Function to toggle the visibility of the add recipe form
function toggleAddRecipeForm() {
    addRecipeDiv.style.display = (addRecipeDiv.style.display === 'none') ? 'block' : 'none';
    addRecipeButton.style.display = (addRecipeButton.style.display === 'none') ? 'block' : 'none';
    if (addRecipeDiv.style.display === 'none') {
        newRecipeForm.reset(); // Clear the form when hiding
    }
}

// Function to handle adding a new recipe (to our mock data)
function addNewRecipe() {
    const title = document.getElementById('new-recipe-title').value;
    const image = document.getElementById('new-recipe-image').value || 'https://via.placeholder.com/300/cccccc/333333?Text=New+Recipe'; // Default image if none provided
    const ingredientsText = document.getElementById('new-recipe-ingredients').value;
    const instructionsText = document.getElementById('new-recipe-instructions').value;

    if (title && ingredientsText && instructionsText) {
        const newRecipe = {
            id: `recipe${nextRecipeId++}`,
            title: title,
            image: image,
            ingredients: ingredientsText.split('\n').filter(item => item.trim() !== ''),
            instructions: instructionsText.split('\n').filter(item => item.trim() !== '')
        };
        recipes.push(newRecipe);
        displayRecipeList(); // Refresh the recipe list to show the new one
        toggleAddRecipeForm(); // Hide the form after adding
    } else {
        alert('Please fill in all the required fields (Title, Ingredients, Instructions).');
    }
}

// Function to display the list of recipes
function displayRecipeList() {
    recipeListDiv.innerHTML = ''; // Clear previous content
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        const title = document.createElement('h3');
        title.textContent = recipe.title;
        recipeCard.appendChild(image);
        recipeCard.appendChild(title);
        recipeCard.addEventListener('click', () => showRecipeDetail(recipe.id));
        recipeListDiv.appendChild(recipeCard);
    });
    recipeListDiv.style.display = 'grid';
    recipeDetailDiv.style.display = 'none';
    addRecipeDiv.style.display = 'none'; // Ensure add recipe form is hidden when showing list
    addRecipeButton.style.display = 'block'; // Ensure add recipe button is visible
}

// Function to display the details of a specific recipe
function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        recipeDetailDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 40%; max-height: 200px; height: auto; border-radius: 8px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; object-fit: contain; background-color: #f9f9f9; padding: 10px;">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <ol>
                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <button onclick="showRecipeList()">Back to Recipes</button>
        `;
        recipeListDiv.style.display = 'none';
        addRecipeDiv.style.display = 'none'; // Ensure add recipe form is hidden
        addRecipeButton.style.display = 'block'; // Ensure add recipe button is visible
        recipeDetailDiv.style.display = 'block';
    }
}

// Function to go back to the recipe list
function showRecipeList() {
    recipeListDiv.style.display = 'grid';
    recipeDetailDiv.style.display = 'none';
    addRecipeDiv.style.display = 'none'; // Ensure add recipe form is hidden
    addRecipeButton.style.display = 'block'; // Ensure add recipe button is visible
}

// Initial display of the recipe list when the page loads
displayRecipeList();