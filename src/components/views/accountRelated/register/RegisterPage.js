import React from "react";
import { Navigate } from "react-router-dom";
import logo from '../../../../images/wariatLogo.png'
import { Link } from 'react-router-dom';
import accountActions from "../../../../api/accountActions";
import RegisterForm from './registerForm.js';
import FormLinks from "../formLinks/FormLinks";
import '../../../../styles/login-register.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userExists: true,
            checkMessage: '',

            data: {
                username: '',
                password: '',
                email: '',
                firstName: '',
            }
        }
    }

    pickRegValues = async (regValues) => {
        this.setState({data: regValues});
        // Check if user exists > send email verification > register
        try {
            const userExists = await this.checkIfUserExists(regValues.username, regValues.email);
            if (!userExists) {
                // Navigate to email confirm page
                await accountActions.sendVerificationEmail(regValues.email);
                this.setState({redirect: true});
            }
        } catch (err) {

        }
    }
 
    checkIfUserExists = async (username, email) => {
        let response = await accountActions.checkIfUserExists(username, email);
        this.setState({checkMessage: response.message});
        return response.exists;
    }

    render() {
        return (
            <div className='RegisterPage'>
                <div className="Logo">
                    <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
                </div>
                <div className="form">
                    <RegisterForm onSubmit={this.pickRegValues}/>
                    <FormLinks withRegister={false}/>
                </div>
                {this.state.redirect && <Navigate to='/email-confirmation' state={{data: this.state.data}}/>}
            </div>
        )
    }
}

export default RegisterPage;