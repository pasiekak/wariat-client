import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './header.css'
import accountActions from '../../../api/accountActions';

import { useTranslation } from 'react-i18next';
import LanguageSelect from './languageSelect/LanguageSelect';
import Logo from '../logo/Logo';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { t } = useTranslation('header', {keyPrefix: 'header' });

    const logout = async () => {
        removeCookie('user');
        await accountActions.logout();
    }

    return (
        <header className="Header">
            <div className='leftHeader'>
                <Link to="/">{t('mainPage')}</Link>
                <Link to="/products">{t('products')}</Link>
                <Link to="/gallery">{t('gallery')}</Link>
            </div>
            <Logo width={125} height={125}/>
            <div className='rightHeader'>
                <Link to="/contact">{t('contact')}</Link>
                <Link to="/about">{t('about')}</Link>
                {(cookies.user) ? '' : <Link to="/login">{t('login')}</Link>}
                {(cookies.user) ? <Link to="/account">{t('your_account')}</Link> : ''}
                {(cookies.user) ? <Link to="/"><span onClick={logout}>{t('logout')}</span></Link> : ''}
            </div>
            <LanguageSelect/>
        </header>
    )
}

export default Header;