import { useLocation } from "react-router-dom";

import EmailCodeForm from "./form/EmailCodeForm";
import Logo from "../../../common/logo/Logo";

import './emailVerification.css';

const EmailVerification = () => {
    const location = useLocation();
    let data = location.state.data;

    return (
        <div className="EmailVerification">
            <div className="left">
                <Logo/>
            </div>
            <div className="right">
                <EmailCodeForm regData={data}/>
            </div>
        </div>
    )
}

export default EmailVerification;