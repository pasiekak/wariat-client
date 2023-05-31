import React from "react";
import logo from '../../../images/wariatLogo.png';
import { Link } from 'react-router-dom';
import loginApiHandler from "../../../api/loginApiHandler";
import RegisterForm from '../../common/forms/registerForm/registerForm.js';
import FormLinks from "../../common/forms/formLinks/FormLinks";
import '../../../styles/login-register-form.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userExists: true,

            data: {
                username: '',
                password: '',
                email: '',
                firstName: '',
            }
        }
    }

    pickRegValues = (regValues) => {
        this.setState({data: regValues});
        // Check if user exists > send email verification > register
        this.checkIfUserExists(regValues.username, regValues.email);
    }
 
    checkIfUserExists = async(username, email) => {
        let userExists = await loginApiHandler.checkIfUserExists(username, email);
        if (userExists === false) {
            this.setState({userExists: false});
        }
    }
    

    render() {
        return (
            <div className='RegisterPage'>
                <div className="Logo">
                    <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
                </div>
                <div className="form">
                    {this.state.userExists ? 
                    <RegisterForm onSubmit={this.pickRegValues}/> 
                    :  
                    <p>Email Verification</p>}
                    
                    <FormLinks withRegister={false}/>
                </div>
            </div>
        )
    }
}

export default RegisterPage;