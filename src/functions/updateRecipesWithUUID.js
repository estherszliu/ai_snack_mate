import { v4 as uuidv4 } from 'uuid';

// Function to update existing recipes in localStorage with UUIDs
export const updateRecipesWithUUID = () => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const updatedRecipes = storedRecipes.map(recipe => {
        if (!recipe.recipe_id) {
            recipe.recipe_id = uuidv4();
        }
        return recipe;
    });
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
};

