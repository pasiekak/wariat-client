import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({
  redirectPath = "/not-logged",
  children,
  accessRoles,
}) => {
  const [cookies] = useCookies(["user"]);
  if (!accessRoles.includes(cookies?.user?.role)) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
