import { useContext } from "react";
import { AccountContext } from "../../account/context/account";
import { Navigate, Outlet } from "react-router-dom";

const ModeratorRoutes = () => {
  const { isLogged, isModerator } = useContext(AccountContext);

  return isLogged() && isModerator() ? (
    <Outlet />
  ) : (
    <Navigate to="/not-logged" />
  );
};

export default ModeratorRoutes;
