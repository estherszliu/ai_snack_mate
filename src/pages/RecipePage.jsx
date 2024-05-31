
import axios from "axios";
import "../styles/RecipePage.css";
import { useState, useContext } from "react";
import { RecipeGlobalDataContext, RecipeGlobalDispatchContext } from "../contexts/recipeDataContext";
import RecipeDetails from  "../components/recipeTemplate";
import { useSearchParams } from "react-router-dom";

export default function RecipePage(){

    const [searchParams] = useSearchParams();
    const initialRecipeName = searchParams.get("name") || "";
    const [recipeName, setRecipeName] = useState(initialRecipeName);
    const [maxIngredients, setMaxIngredients] = useState("");
    const [maxSteps, setMaxSteps] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    // const [editableRecipeName, setEditableRecipeName] = useState("");
    const addRecipe = useContext(RecipeGlobalDispatchContext);
    const recipes = useContext(RecipeGlobalDataContext);


    const handleGenerateRecipe = async () => {
        const prompt = `Generate a JSON formatted recipe for ${recipeName} with maximum \${maxIngredients} ingredients and ${maxSteps} steps, including detailed nutritional information per serving and per 100g. The JSON should have the following fields and structure:

        {   
           
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
    
            // Parsing the mock response text
            const generatedRecipe = response.data.choices[0].message.content;
            setGeneratedRecipe(JSON.parse(generatedRecipe));
            // setEditableRecipeName(generatedRecipe.recipe_name);

            // Use context to update the global recipe list
            // addRecipe(prevRecipes => [...prevRecipes, generatedRecipe]);
            
        } catch (error) {
            console.error("Error generating recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    const handelSaveRecipe =() => {
        if (generatedRecipe) {

            // const recipeNameToSave = editableRecipeName ? editableRecipeName.trim() : generatedRecipe.recipe_name;

            // const recipeExists = recipes.some(
            //     (recipe) => recipe.recipe_name === recipeNameToSave
            // );

            // if (recipeExists) {
            //     setSaveMessage("Recipe with the same name already exists! Try to change the recipe name then save again if you wish to save it!");
            // } else{
            //     const newRecipe = { ...generatedRecipe, recipe_name: recipeNameToSave };
            //     addRecipe(prevRecipes => [...prevRecipes, newRecipe]);
            //     setSaveMessage("Recipe saved successfully!");
            // }

            const recipeExists = recipes.some(
                (recipe) => recipe.recipe_name === generatedRecipe.recipe_name
            );
            
            if (recipeExists) {
                setSaveMessage("Recipe with the same name already exists!")
            } else {
                addRecipe(prevRecipes => [...prevRecipes, generatedRecipe]);
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