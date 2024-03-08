import Logo from "../../../../../../components/logo/Logo";
import LoginForm from "./components/LoginForm";
import FormLinks from "../../components/form-links/FormLinks";
import "./styles/loginPage.css";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="left">
        <Logo width={400} height={400} pathTo={"/"} />
      </div>
      <div className="right">
        <LoginForm />
        <FormLinks withRegister={true} />
      </div>
    </div>
  );
};

export default LoginPage;
