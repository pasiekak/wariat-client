import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'
import logo from '../images/random150x150.jpg';


const Navbar = () => {
    return (
        <header className="Navbar">
            <img src={logo} alt="logo"/>
            <Link to="/">Strona główna</Link>
            <Link to="/products">Produkty</Link>
            <Link to="/gallery">Galeria</Link>
            <Link to="/contact">Kontakt</Link>
            <Link to="/about">O nas</Link>
        </header>
    )
}

export default Navbar;