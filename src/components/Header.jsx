import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header(){

    return(
        <header>
            <div id="headerBranding">
                AI Snack Mate
            </div>
            <nav id="headerNavbar">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/recipe"}>recipe</NavLink>
                <NavLink to={"/recipeideas"}>recipe ideas</NavLink>
                <NavLink to={"/about"}>about</NavLink>
            </nav>
        </header>
    )
}