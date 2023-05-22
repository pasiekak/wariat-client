import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './header.css'
import logo from '../../images/wariatLogo.png';
import responseHandler from '../../api/responseHandler';

const Header = () => {
    const [cookies, removeCookie] = useCookies();

    const logout = async () => {
        removeCookie('user');
        await responseHandler.logout();
    }

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
                {(cookies.user) ? '' : <Link to="/login">Zaloguj się</Link>}
                {(cookies.user) ? <Link to="/account">Moje konto</Link> : ''}
                {(cookies.user) ? <span onClick={logout}>Wyloguj się</span> : ''}
            </div>
        </header>
    )
}

export default Header;