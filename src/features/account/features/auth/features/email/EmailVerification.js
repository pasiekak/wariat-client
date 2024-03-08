import { useLocation } from "react-router-dom";

import EmailCodeForm from "./components/EmailCodeForm";
import Logo from "../../../../../../components/logo/Logo";

import "./styles/emailVerification.css";

const EmailVerification = () => {
  const location = useLocation();
  let data = location.state.data;

  return (
    <div className="EmailVerification">
      <div className="left">
        <Logo width={400} height={400} />
      </div>
      <div className="right">
        <EmailCodeForm regData={data} />
      </div>
    </div>
  );
};

export default EmailVerification;
