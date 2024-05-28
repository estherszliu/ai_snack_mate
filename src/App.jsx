import { Route, Routes } from "react-router-dom";
import Template from "./pages/_TemplatePage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeSavedPage from "./pages/RecipeSavedPage";

function App() {
  return (
      <Routes >
        <Route path="/" element={<Template />} >
          <Route index element={<HomePage />} />
          <Route path="recipe" element={<RecipePage />}/>
          <Route path="recipe/saved" element={<RecipeSavedPage />}/>
          {/* <Route path="recipeideas" element={<recipeIdeas />} /> */}
          {/* <Route path="about" element={<about />}/>  */}
        </Route>
      </Routes>
  );
}

export default App;
