import { useContext } from "react";
import { AccountContext } from "../../account/context/AccountContext";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedOnlyRoutes = () => {
  const { isLogged } = useContext(AccountContext);

  return !isLogged() ? <Outlet /> : <Navigate to="/" />;
};

export default NotLoggedOnlyRoutes;
