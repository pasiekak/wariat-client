import { React } from 'react';
import '../../../../styles/login-register.css';
import { Link } from 'react-router-dom';
import logo from '../../../../images/wariatLogo.png'
import LoginForm from './loginForm';
import FormLinks from '../formLinks/FormLinks';

const LoginPage = () => {

    return (
        <div className='LoginPage'>
            <div className='Logo'>
                <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
            </div>
            <div className='form'>
                <LoginForm/>
                <FormLinks withRegister={true}/>
            </div>
        </div>
    )
}

export default LoginPage;