import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './header.css'
import logo from '../../../images/wariatLogo.png'
import loginApiHandler from '../../../api/loginApiHandler';

import { useTranslation } from 'react-i18next';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();

    const logout = async () => {
        removeCookie('user');
        await loginApiHandler.logout();
    }

    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
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
                <select name='language' onChange={onChange}>
                    <option value='pl'>Polish</option>
                    <option value='en'>English</option>
                </select>
            </div>
        </header>
    )
}

export default Header;