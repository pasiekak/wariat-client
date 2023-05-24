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
                <Link to="/">{t('main_page')}</Link>
                <Link to="/products">{t('products')}</Link>
                <Link to="/gallery">{t('gallery')}</Link>
            </div>
            <div className='imageHeader'>
                <Link to="/"><img src={logo} alt="Wariat logo"/></Link>
            </div>
            <div className='rightHeader'>
                <Link to="/contact">{t('contact')}</Link>
                <Link to="/about">{t('about')}</Link>
                {(cookies.user) ? '' : <Link to="/login">{t('login')}</Link>}
                {(cookies.user) ? <Link to="/account">{t('your_account')}</Link> : ''}
                {(cookies.user) ? <span onClick={logout}>{t('logout')}</span> : ''}
                <select name='language' onChange={onChange}>
                    <option value='pl'>Polish</option>
                    <option value='en'>English</option>
                </select>
            </div>
        </header>
    )
}

export default Header;