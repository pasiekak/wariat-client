import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../account/context/account";

const ProtectedRoute = ({
  redirectPath = "/not-logged",
  children,
  accessRoles,
}) => {
  const { user } = useContext(AccountContext);

  if (!accessRoles.includes(user?.role)) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
