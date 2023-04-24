import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'
import logo from '../images/random150x150.jpg'


function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="links">
                <Link to="/">Strona główna</Link>
                <Link to="/products">Produkty</Link>
                <Link to="/galery">Galeria</Link>
                <Link to="/contact">Kontakt</Link>
                <Link to="/about">O nas</Link>
            </div>
        </div>
    )
}

export default Navbar