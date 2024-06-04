import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    };

    return (
        <header>
            <div id="headerBranding">Snack Mate</div>
            <button className="hamburger" onClick={toggleMobileMenu}>
                ☰
            </button>
            <nav className={isMobileMenuOpen ? 'open' : ''}>
                <NavLink to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                <NavLink to={"/recipe"}>Recipes</NavLink>    
                <NavLink to={"/recipeideas"} onClick={() => setIsMobileMenuOpen(false)}>Recipe Ideas</NavLink>
                <NavLink to={"/recipe/saved"} onClick={() => setIsMobileMenuOpen(false)}>Saved Recipes</NavLink>
                <NavLink to={"/about"} onClick={() => setIsMobileMenuOpen(false)} >About</NavLink>
            </nav>
        </header>
    );
}
