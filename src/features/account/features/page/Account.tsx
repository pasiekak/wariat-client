import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../../context/AccountContext";
import AccountContent from "./components/AccountContent";

import "./styles/account.css";

const Account = () => {
  const { isLogged } = useContext(AccountContext);

  return (
    <div className="account bck-smooth">
      {isLogged() ? (
        <AccountContent />
      ) : (
        <Navigate to="/not-logged" replace={true} />
      )}
    </div>
  );
};

export default Account;
