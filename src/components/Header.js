import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'
import logo from '../images/random150x150.png';
import SearchBar from './SearchBar.js'


const Header = () => {
    return (
        <header className="Header">
            <Link to="/"><img src={logo} alt="Wariat logo"/></Link>
            <div className="linksAndSearch">
                <div className="links">
                    <Link to="/">Strona główna</Link>
                    <Link to="/products">Produkty</Link>
                    <Link to="/gallery">Galeria</Link>
                    <Link to="/contact">Kontakt</Link>
                    <Link to="/about">O nas</Link>
                </div>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;