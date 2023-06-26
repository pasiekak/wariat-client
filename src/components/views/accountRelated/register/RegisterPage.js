import Logo from "../../../common/logo/Logo";
import RegisterMultiForm from "./form/RegisterMultiForm";
import FormLinks from "../form-links/FormLinks";

import './registerPage.css';

const RegisterPage = () => {
    return (
        <div className="RegisterPage">
            <div className="left">
                <Logo/>    
            </div>            
            <div className="right">
                <RegisterMultiForm/>
                <FormLinks withLogin={true}/>
            </div>
        </div>
    )
}

export default RegisterPage;