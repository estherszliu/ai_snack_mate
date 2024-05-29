import "../styles/RecipeIdeasPage.css"


export default function ReicipeIdeasPage(){




    return(
        <div id="recipeIdeasPageContainer">
            <div id="recipeIdeasContainer" >
                <div className="inputIdeas">Ingredients or name in the recipe</div>
                <input />
                <div className="inputIdeas">Any special requirement such as gluten free, dairy free etc. </div>
                <input />
                <button>Generate recipe ideas</button>
            </div>
        </div>
    )
}