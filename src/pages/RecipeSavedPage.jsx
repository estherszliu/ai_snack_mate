import { useContext } from "react";
import { RecipeGlobalDataContext } from "../contexts/recipeDataContext";
import RecipeDetails from "../components/recipeTemplate";
import "../styles/RecipeSavedPage.css";


export default function RecipeSavedPage(){

    const recipes = useContext(RecipeGlobalDataContext)

    const parsedRecipes = recipes.map(recipe => {
        return typeof recipe === 'string' ? JSON.parse(recipe) : recipe;
    });

    return (

        <div id="recipeSavedPageContainer">
            <div id="recipeSavedContentContainer">
                <h1 id="savedRecipesTitle">Saved Recipes</h1>
                {parsedRecipes.map((recipe, index) => (
                    <div className="savedRecipeBox" key={index}>
                        <RecipeDetails recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
}