import Logo from '../../../common/logo/Logo';
import LoginForm from './form/LoginForm';
import FormLinks from '../form-links/FormLinks';
import './loginPage.css';

const LoginPage = () => {

    return (
        <div className='LoginPage'>
            <div className='left'>
                <Logo width={400} height={400} pathTo={'/'}/>
            </div>
            <div className='right'>
                <LoginForm/>
                <FormLinks withRegister={true}/>
            </div>
        </div>
    )
}

export default LoginPage;