import Logo from "../../../../../../components/logo/Logo";
import RegisterMultiForm from "./components/RegisterMultiForm";
import FormLinks from "../../components/form-links/FormLinks";

import './styles/registerPage.css';

const RegisterPage = () => {
    return (
        <div className="RegisterPage">
            <div className="left">
                <Logo width={400} height={400} pathTo={'/'}/>    
            </div>            
            <div className="right">
                <RegisterMultiForm/>
                <FormLinks withLogin={true}/>
            </div>
        </div>
    )
}

export default RegisterPage;