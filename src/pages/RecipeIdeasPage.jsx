import axios from "axios";
import "../styles/RecipeIdeasPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipeIdeasPage() {
    const [inputValue, setInputValue] = useState("");
    const [recipeIdeas, setRecipeIdeas] = useState([]);
    const navigate = useNavigate();

    const handleGenerateRecipeIdeas = async () => {
        const prompt = `Generate 5 recipe ideas based on the following input: ${inputValue}. The response should be a JSON array with the structure:
        [
            { "recipe_name": "<Recipe Name>" },
            { "recipe_name": "<Recipe Name>" },
            // repeat for 5 items
        ]`;
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 200
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    }
                }
            );

            const generatedIdeas = JSON.parse(response.data.choices[0].message.content);
            setRecipeIdeas(generatedIdeas);

        } catch (error) {
            console.error("Error generating recipe ideas:", error);
        }
    };

    const handleRecipeClick = (recipeName) => {
        navigate(`/generate-recipe?name=${recipeName}`);
    };

    return (
        <div id="recipeIdeasPageContainer">
            <div id="recipeIdeasContainer">
                <div className="inputIdeas">Ingredients or name in the recipe</div>
                <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleGenerateRecipeIdeas}>Generate Recipe Ideas</button>
                {recipeIdeas.length > 0 && (
                    <ul>
                        {recipeIdeas.map((idea, index) => (
                            <li key={index} onClick={() => handleRecipeClick(idea.recipe_name)}>
                                {idea.recipe_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}