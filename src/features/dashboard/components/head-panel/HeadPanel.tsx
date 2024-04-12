import { useContext } from "react";
import { AccountContext } from "../../../account/context/AccountContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../components/logo/Logo";
import "../../styles/head-panel.css";

const HeadPanel = () => {
  const { personalData, user } = useContext(AccountContext);
  const navigate = useNavigate();

  const renderName = () => {
    if (personalData) {
      return personalData.firstName;
    } else if (user) {
      return user.username;
    }
    return null;
  };

  return (
    <section className="head-panel">
      <span>Cześć {renderName()}</span>
      <Logo width={100} height={100} withPhone={false} pathTo={"/"} />
      <Button variant="dark" onClick={() => navigate("/")}>
        Strona główna
      </Button>
    </section>
  );
};

export default HeadPanel;
