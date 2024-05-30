import { Route, Routes } from "react-router-dom";
import Template from "./pages/_TemplatePage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeSavedPage from "./pages/RecipeSavedPage";
import ReicipeIdeasPage from "./pages/RecipeIdeasPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
      <Routes >
        <Route path="/" element={<Template />} >
          <Route index element={<HomePage />} />
          <Route path="recipe" element={<RecipePage />}/>
          <Route path="recipe/saved" element={<RecipeSavedPage />}/>
          <Route path="recipeideas" element={<ReicipeIdeasPage />} />
          <Route path="generate-recipe" element={<RecipePage />} />
          <Route path="about" element={<AboutPage />}/> 
        </Route>
      </Routes>
  );
}

export default App;
