import Logo from "../../../common/logo/Logo";
import RegisterMultiForm from "./form/RegisterMultiForm";
import FormLinks from "../formLinks/FormLinks";

import './registerPage.css';

const RegisterPage = () => {
    return (
        <div className="RegisterPage">
            <div className="left">
                <Logo/>    
            </div>            
            <div className="right">
                <RegisterMultiForm/>
                <FormLinks/>
            </div>
        </div>
    )
}

export default RegisterPage;