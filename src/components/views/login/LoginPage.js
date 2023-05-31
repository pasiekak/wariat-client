import { React } from 'react';
import '../../../styles/login-register-form.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/wariatLogo.png';
import LoginForm from '../../common/forms/loginForm/loginForm';
import FormLinks from '../../common/forms/formLinks/FormLinks';

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