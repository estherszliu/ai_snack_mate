import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div id="homeContainer">
      <h1 id="homeTitle">Welcome to Snack Mate</h1>
      <p id="homeDescription">Discover the joy of cooking with our powered recipe generator. Enter any dish, and we'll provide a delicious recipe tailored just for you!</p>
      <div id="homeImages">
        <img src="./delicious-food.jpg" alt="Delicious Food" className="homeImage"/>
        <img src="./cooking.jpg" alt="Cooking" className="homeImage"/>
        <img src="./ingredients.jpg" alt="Ingredients" className="homeImage"/>
      </div>
      <div id="homeLinks">
        <Link to="/recipe" className="button-link">Find a Specific Recipe</Link>
        <Link to="/recipeideas" className="button-link">Explore Recipe Ideas</Link>
      </div>
    </div>
  );
}
