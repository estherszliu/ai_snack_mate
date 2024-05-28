import { useContext } from "react";
import { RecipeGlobalDataContext } from "../contexts/recipeDataContext";
import RecipeDetails from "../components/recipeTemplate";


export default function RecipeSavedPage(){

    const recipes = useContext(RecipeGlobalDataContext)

    const parsedRecipes = recipes.map(recipe => {
        return typeof recipe === 'string' ? JSON.parse(recipe) : recipe;
    });

    return (

        <div>
            {/* list of recipes */}
            <h1>Local saved Recipe</h1>
            <ul>
                {parsedRecipes.map((recipe, index) => (
                    <li key={index}>
                    <RecipeDetails recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
}