import { useContext } from "react";
import { AccountContext } from "../../account/context/AccountContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLogged } = useContext(AccountContext);

  return isLogged() ? <Outlet /> : <Navigate to="/not-logged" />;
};

export default ProtectedRoutes;
