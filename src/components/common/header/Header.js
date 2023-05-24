import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './header.css'
import logo from '../../../images/wariatLogo.png'
import loginApiHandler from '../../../api/loginApiHandler';

import { useTranslation } from 'react-i18next';
import LanguageSelect from '../languageSelect/LanguageSelect';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { t } = useTranslation();

    const logout = async () => {
        removeCookie('user');
        await loginApiHandler.logout();
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
            </div>
            <LanguageSelect/>
        </header>
    )
}

export default Header;