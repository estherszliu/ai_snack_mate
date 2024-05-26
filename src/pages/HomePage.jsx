import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div id="homeContainer">
      <h1 id="homeTitle">Welcome to AI Snack Mate</h1>
      <p id="homeDescription">We are here to help you find some recipe ideas</p>
      <Link to="/recipe" className="button-link">Looking for some particular recipe</Link>
      <Link to="/recipeideas" className="button-link">Looking for some recipe ideas</Link>
    </div>
  );
}