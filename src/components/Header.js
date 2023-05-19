import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import logo from '../images/wariatLogo.png';
import axios from 'axios';

const Header = () => {
    const [user, setUser] = useState({});

    const logout = () => {
        axios.delete('/logout').then((axiosRes) => {
            setUser({});
        });
    }

    useEffect(() => {
        axios.get('/login').then((axiosRes) => {  
            if (axiosRes.data.auth === true) {
                setUser(axiosRes.data.user);
            }
        })
    }, [])

    return (
        <header className="Header">
            <div className='leftHeader'>
                <Link to="/">Strona główna</Link>
                <Link to="/products">Produkty</Link>
                <Link to="/gallery">Galeria</Link>
            </div>
            <div className='imageHeader'>
                <Link to="/"><img src={logo} alt="Wariat logo"/></Link>
            </div>
            <div className='rightHeader'>
                <Link to="/contact">Kontakt</Link>
                <Link to="/about">O nas</Link>
                {(user.username) ? '' : <Link to="/login">Logowanie</Link>}
                {(user.username) ? <Link to="/accountManager">Twoje konto</Link> : ''}
                {(user.username) ? <span onClick={logout}>Wyloguj się</span> : ''}
            </div>
        </header>
    )
}

export default Header;