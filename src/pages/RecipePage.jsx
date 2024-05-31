import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../styles/RecipePage.css";
import { useState, useContext, useEffect } from "react";
import { RecipeGlobalDataContext, RecipeGlobalDispatchContext } from "../contexts/recipeDataContext";
import RecipeDetails from  "../components/recipeTemplate";
import { useSearchParams } from "react-router-dom";
import { updateRecipesWithUUID } from "../functions/updateRecipesWithUUID";

export default function RecipePage(){

    const [searchParams] = useSearchParams();
    const initialRecipeName = searchParams.get("name") || "";
    const [recipeName, setRecipeName] = useState(initialRecipeName);
    const [maxIngredients, setMaxIngredients] = useState("");
    const [maxSteps, setMaxSteps] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const addRecipe = useContext(RecipeGlobalDispatchContext);
    const recipes = useContext(RecipeGlobalDataContext);

    // Call the function to update the recipes when the component mounts
    useEffect(() => {
        updateRecipesWithUUID();
    }, []);

    const handleGenerateRecipe = async () => {
        const prompt = `Generate a JSON formatted recipe for ${recipeName} with maximum \${maxIngredients} ingredients and ${maxSteps} steps, including detailed nutritional information per serving and per 100g. The JSON should have the following fields and structure:

        {   
            "recipe_id": "<UUID>",
            "recipe_name": "<Recipe Name>",
            "serves": <Number of Servings>,
            "serving_size": "<Serving Size>",
            "ingredients": [
                { "name": "<Ingredient Name>", "quantity": "<Quantity>" }
                // repeat for each ingredient
            ],
            "steps": [
                { "number": <Step Number>, "step": "<Step Description>" }
                // repeat for each step
            ],
            "nutrition": {
                "per_serving": {
                    "calories": <Calories per Serving>,
                    "protein": "<Protein per Serving>",
                    "fat": "<Fat per Serving>",
                    "carbohydrates": "<Carbohydrates per Serving>",
                    "fiber": "<Fiber per Serving>",
                    "sugar": "<Sugar per Serving>"
                },
                "per_100g": {
                    "calories": <Calories per 100g>,
                    "protein": "<Protein per 100g>",
                    "fat": "<Fat per 100g>",
                    "carbohydrates": "<Carbohydrates per 100g>",
                    "fiber": "<Fiber per 100g>",
                    "sugar": "<Sugar per 100g>"
                }
            }
        }`;      
        try { 
            setLoading(true);
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 1000
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    }
                }
            );

    
            // Simulating async behavior
            await new Promise(resolve => setTimeout(resolve, 1000));
    
           
            const generatedRecipe = JSON.parse(response.data.choices[0].message.content);
            generatedRecipe.recipe_id = uuidv4();
            setGeneratedRecipe(generatedRecipe);
            
        } catch (error) {
            console.error("Error generating recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    const handelSaveRecipe =() => {
        if (generatedRecipe) {

            const recipeExists = recipes.some(
                (recipe) => recipe.recipe_id === generatedRecipe.recipe_id
            );
            
            if (recipeExists) {
                setSaveMessage("Recipe already exists!")
            } else {
                // addRecipe(prevRecipes => [...prevRecipes, generatedRecipe]);

                const updateRecipes = [...recipes, generatedRecipe];
                addRecipe(updateRecipes);
                localStorage.setItem("recipes", JSON.stringify(updateRecipes));
                setSaveMessage("Recipe saved successfully!");
            }

            setTimeout(() => setSaveMessage(""), 3000);
        } else { 
            console.log("No recipe generated to save!");
        }
    };
            

    return(
        <div id="recipePageContainer">
            <h1 id="recipeTitle">Generate Recipe</h1>
            <div id="recipeContentContainer">
                <div className="inputGroup">Recipe name</div>
                <input 
                    id="recipeInput"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <div className="inputGroup">Maximum number of ingredients</div>
                <input 
                    id="ingredientNumInput"
                    value={maxIngredients}
                    onChange={(e) => setMaxIngredients(e.target.value)}
                />
                <div className="inputGroup">Maximum number of steps </div>
                <input 
                    id="stepsNumInput"
                    value={maxSteps}
                    onChange={(e) => setMaxSteps(e.target.value)}
                />
                <button id="generatbnt" onClick={handleGenerateRecipe} disabled={loading}>
                    {loading ? "Generating..." : "Generate Recipe"} 
                </button>
                {generatedRecipe && ( <button onClick={handelSaveRecipe}>Save Recipe</button>
                )}
                {loading && <div className="loading"> Loading...</div>}
                {saveMessage && <div className="saveMessage">{saveMessage}</div>}
                {generatedRecipe && <RecipeDetails recipe={generatedRecipe} />}
            </div>
        </div>
    )

}