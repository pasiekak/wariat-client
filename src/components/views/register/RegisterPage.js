import React from "react";
import logo from '../../../images/wariatLogo.png';
import { Link } from 'react-router-dom';
import RegisterForm from '../../common/forms/registerForm/registerForm.js';
import '../../../styles/login-register-form.css';

const RegisterPage = () => {
    
    return (
        <div className='RegisterPage'>
            <div className="Logo">
                <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
            </div>
            <div className="form">
                <RegisterForm/>
                <div className="links">
                    <Link to='/login'>Masz już konto? Zaloguj się</Link>
                    <Link to='/'>Wróć do strony głównej</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;