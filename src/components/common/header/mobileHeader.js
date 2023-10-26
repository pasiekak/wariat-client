import { Link } from "react-router-dom";

import Logo from "../logo/Logo";
import LanguageSelect from "./languageSelect/LanguageSelect";
import './mobileHeader.css';
import { useState } from "react";

const MobileHeader = ({logout, t, cookies}) => {
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    
    return (
        <div className='mobileHeader'>
            <div className='leftMobile' onClick={() => setShowDropdown1(!showDropdown1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="white" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                {showDropdown1 && 
                <div className="mobileDropdownList leftDropdown">
                    <Link to="/">{t('mainPage')}</Link>
                    <Link to="/products">{t('products')}</Link>
                    <Link to="/gallery">{t('gallery')}</Link>
                    <Link to="/contact">{t('contact')}</Link>
                    <Link to="/about">{t('about')}</Link>
                </div>}
                
            </div>
            <Logo width={64} height={64} pathTo={'/'}/>
            <div className='rightMobile' onClick={() => setShowDropdown2(!showDropdown2)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="white" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
                {showDropdown2 && 
                <div className="mobileDropdownList rightDropdown">
                    {(cookies.user) ? '' : <Link to="/login">{t('login')}</Link>}
                    {(cookies.user) ? <Link to="/account">{t('your_account')}</Link> : ''}
                    {(cookies.user) ? <Link to="/"><span onClick={logout}>{t('logout')}</span></Link> : ''}
                </div>}
            </div>
        </div>
    )
}

export default MobileHeader;