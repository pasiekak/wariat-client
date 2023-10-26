import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import accountActions from '../../../api/accountActions';

import LanguageSelect from './languageSelect/LanguageSelect';
import MobileHeader from './mobileHeader';
import Logo from '../logo/Logo';

import './header.css';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { t } = useTranslation('header', {keyPrefix: 'header' });
    const isMobile = useMediaQuery({maxWidth: 767});

    const logout = async () => {
        removeCookie('user');
        await accountActions.logout();
    }

    return (
        <>
        {isMobile ? 
        <MobileHeader logout={logout} t={t} cookies={cookies}/>
        :
        <header className="Header">
            <div className='leftHeader'>
                <Link to="/">{t('mainPage')}</Link>
                <Link to="/products">{t('products')}</Link>
                <Link to="/gallery">{t('gallery')}</Link>
                </div>
                <Logo width={125} height={125} pathTo={'/'}/>
            <div className='rightHeader'>
                <Link to="/contact">{t('contact')}</Link>
                <Link to="/about">{t('about')}</Link>
                {(cookies.user) ? '' : <Link to="/login">{t('login')}</Link>}
                {(cookies.user) ? <Link to="/account">{t('your_account')}</Link> : ''}
                {(cookies.user) ? <Link to="/"><span onClick={logout}>{t('logout')}</span></Link> : ''}
            </div>
            <LanguageSelect className={'topLang'}/>
        </header>
        }        
        </>
    )
}

export default Header;