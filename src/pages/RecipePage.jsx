import axios from "axios";
import "../styles/RecipePage.css";
import { useState, useContext } from "react";
import { RecipeGlobalDataContext, RecipeGlobalDispatchContext } from "../contexts/recipeDataContext";
import RecipeDetails from  "../components/recipeTemplate";

const mockApiResponse = {
    recipe_name: "Chicken Thai Green Curry",
    serves: 4,
    serving_size: "400g",
    ingredients: [
        { name: "Chicken Thigh", quantity: "400g" },
        { name: "Chickpeas", quantity: "200g" },
        { name: "Coconut Milk", quantity: "400ml" },
        { name: "Broccolini", quantity: "200g" },
        { name: "Green Curry Paste", quantity: "50g" },
        { name: "Fish Sauce", quantity: "2 tbsp" },
        { name: "Brown Sugar", quantity: "1 tbsp" },
        { name: "Lime Leaves", quantity: "3" }
    ],
    steps: [
        { number: 1, step: "Cut the chicken thighs into small pieces and fry in a large pan over medium heat until cooked through." },
        { number: 2, step: "Add the green curry paste to the pan and cook for 1-2 minutes until fragrant." },
        { number: 3, step: "Pour in the coconut milk, stir well to combine, and bring to a simmer." },
        { number: 4, step: "Add the chickpeas, broccolini, fish sauce, brown sugar, and lime leaves. Stir to combine." },
        { number: 5, step: "Simmer for 10-15 minutes until the vegetables are tender and the flavors are well combined." },
        { number: 6, step: "Remove the lime leaves and serve the curry hot with steamed rice." }
    ],
    nutrition: {
        per_serving: {
            calories: 450,
            protein: "25g",
            fat: "30g",
            carbohydrates: "20g",
            fiber: "5g",
            sugar: "4g"
        },
        per_100g: {
            calories: 112,
            protein: "6.3g",
            fat: "7.5g",
            carbohydrates: "5g",
            fiber: "1.3g",
            sugar: "1g"
        }
    }
};


export default function RecipePage(){

    const [recipeName, setRecipeName] = useState("");
    const [maxIngredients, setMaxIngredients] = useState("");
    const [maxSteps, setMaxSteps] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const recipes = useContext(RecipeGlobalDataContext);
    const addRecipe = useContext(RecipeGlobalDispatchContext)


    const handleGenerateRecipe = async () => {
        const prompt = `Generate a JSON formatted recipe for \${recipeName} with maximum \${maxIngredients} ingredients and \${maxSteps} steps, including detailed nutritional information per serving and per 100g. The JSON should have the following fields and structure:

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
            // Simulating an API response using mock data
            // const response = {
            //     data: {
            //         choices: [
            //             {
            //                 text: JSON.stringify(mockApiResponse)
            //             }
            //         ]
            //     }
            // };
            
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

            // Use context to update the global recipe list
            // addRecipe(prevRecipes => [...prevRecipes, generatedRecipe]);
            
        } catch (error) {
            console.error("Error generating recipe:", error);
        }
    };

    const handelSaveRecipe =() => {
        if (generatedRecipe) {
            addRecipe(prevRecipes => [...prevRecipes, generatedRecipe]);
        } else {
            console.log("No recipe generated to save!");
        }
    };
            

    return(
        <div id="recipePageContainer">
            <div id="recipeContentContainer">
                <div className="inputGroup">Recipe name</div>
                <input 
                    id="recipeInput"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <div className="inputGroup">Maximum of ingredients</div>
                <input 
                    id="ingredientNumInput"
                    value={maxIngredients}
                    onChange={(e) => setMaxIngredients(e.target.value)}
                />
                <div className="inputGroup">Maximum of step </div>
                <input 
                    id="stepsNumInput"
                    value={maxSteps}
                    onChange={(e) => setMaxSteps(e.target.value)}
                />
                <button id="generatbnt" onClick={handleGenerateRecipe}> Generate Recipe </button>
                {generatedRecipe && (
                    <button onClick={handelSaveRecipe}>Save Recipe</button>
                )}
                {generatedRecipe && <RecipeDetails recipe={generatedRecipe} />}
            </div>
        </div>
    )

}