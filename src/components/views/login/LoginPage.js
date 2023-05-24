import { React } from 'react';
import '../../../styles/login-register-form.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/wariatLogo.png';
import LoginForm from '../../common/forms/loginForm/loginForm';

const LoginPage = () => {

    return (
        <div className='LoginPage'>
            <div className='Logo'>
                <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
            </div>
            <div className='form'>
                <LoginForm/>
                <div className='links'>
                    <Link to='/register'>Nie masz konta? Zarejestruj się!</Link>
                    <Link to='/'>Wróć do strony głównej</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;