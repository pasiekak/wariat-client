import React from 'react';
import '../styles/Footer.css';
import { Link  } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='column'>
                    <h4>O nas</h4>
                    <Link to='/projects'>Projekty</Link>
                    <Link to='/'>Cos tam</Link>
                    <Link to='/'>Cos tam</Link>
                </div>
                <div className='column'>
                    <h4>Kontakt</h4>
                    <Link to='/marek'>Marek</Link>
                    <Link to='/kamil'>Kamil</Link>
                    <Link to='/'>Cos tam</Link>
                    <Link to='/'>Cos tam</Link>
                </div>
                <div className='column'>
                    <h4>Media społecznościowe</h4>
                    <Link to='/'>Facebook</Link>
                    <Link to='/'>Instagram</Link>
                    <Link to='/'>Youtube</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;