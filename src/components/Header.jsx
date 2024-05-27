import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <div id="headerBranding">AI Snack Mate</div>
            <nav id="headerNavbar">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/recipe"}>Recipes</NavLink>
                <NavLink to={"/recipeideas"}>Recipe Ideas</NavLink>
                <NavLink to={"/about"}>About</NavLink>
            </nav>
        </header>
    );
}
