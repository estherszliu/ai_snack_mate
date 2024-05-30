import { createContext } from "react";
import { useLocalStorage } from "react-use";

export const RecipeGlobalDataContext = createContext([])
export const RecipeGlobalDispatchContext = createContext(null)


export function RecipeDataProvider({ children }){

    
    const [recipeData, setRecipeData] = useLocalStorage("recipes", []);
    
    return(
        <RecipeGlobalDataContext.Provider value={recipeData}>
            <RecipeGlobalDispatchContext.Provider value={setRecipeData}>
                {children}
            </RecipeGlobalDispatchContext.Provider>
        </RecipeGlobalDataContext.Provider>
    )
}