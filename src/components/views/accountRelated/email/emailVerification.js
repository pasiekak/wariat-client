import { useLocation } from "react-router-dom";

const EmailVerification = () => {
    const location = useLocation();
    console.log(location.state.data);

    return (
        <div className="emailVerification">
            Weryfikujemy email
        </div>
    )
}

export default EmailVerification;