import { React } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../common/logo/Logo';
import LoginForm from './form/LoginForm';
import FormLinks from '../formLinks/FormLinks';
import './loginPage.css';

const LoginPage = () => {

    return (
        <div className='LoginPage'>
            <div className='left'>
                <Logo/>
            </div>
            <div className='right'>
                <LoginForm/>
                <FormLinks withRegister={true}/>
            </div>
        </div>
    )
}

export default LoginPage;