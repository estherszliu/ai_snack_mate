
export default function RecipeDetails({ recipe }) {
    if (!recipe) return null;  // Render nothing if no recipe is provided
    
    return (
        <div className="recipeDetails">
            <h2 className="recipe_name">{recipe.recipe_name}</h2>
            <p>Serves: {recipe.serves}</p>
            <p>Serving size: {recipe.serving_size}</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}: {ingredient.quantity}</li>
                ))}
            </ul>
            <h3>Steps:</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step.step}</li>
                ))}
            </ol>
            <h3>Nutrition Information (per serving):</h3>
            <ul>
                <li>Calories: {recipe.nutrition.per_serving.calories}</li>
                <li>Protein: {recipe.nutrition.per_serving.protein}</li>
                <li>Fat: {recipe.nutrition.per_serving.fat}</li>
                <li>Carbohydrates: {recipe.nutrition.per_serving.carbohydrates}</li>
                <li>Fiber: {recipe.nutrition.per_serving.fiber}</li>
                <li>Sugar: {recipe.nutrition.per_serving.sugar}</li>
            </ul>
            <h3>Nutrition Information (per 100g):</h3>
            <ul>
                <li>Calories: {recipe.nutrition.per_100g.calories}</li>
                <li>Protein: {recipe.nutrition.per_100g.protein}</li>
                <li>Fat: {recipe.nutrition.per_100g.fat}</li>
                <li>Carbohydrates: {recipe.nutrition.per_100g.carbohydrates}</li>
                <li>Fiber: {recipe.nutrition.per_100g.fiber}</li>
                <li>Sugar: {recipe.nutrition.per_100g.sugar}</li>
            </ul>
        </div>
    )
}