import { useContext } from "react";
import { AccountContext } from "../../../account/context/account";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../components/logo/Logo";
import "../../styles/head-panel.css";

const HeadPanel = () => {
  const { user } = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <section className="head-panel">
      <span>Cześć {user?.firstName ? user.firstName : user.username}</span>
      <Logo width={100} height={100} withPhone={false} pathTo={"/"} />
      <Button variant="dark" onClick={() => navigate("/")}>
        Strona główna
      </Button>
    </section>
  );
};

export default HeadPanel;
