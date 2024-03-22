import useRole from "../../../../../api/hooks/role/useRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScrewdriverWrench,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/user-role.css";

const UserRole = ({ roleID }: { roleID: number }) => {
  const { data } = useRole({ roleID });

  const generateRoleIcon = (roleName: string) => {
    if (roleName === "admin") {
      return <FontAwesomeIcon icon={faUserTie} />;
    } else if (roleName === "moderator") {
      return <FontAwesomeIcon icon={faScrewdriverWrench} />;
    } else {
      return <FontAwesomeIcon icon={faUser} />;
    }
  };

  return (
    <div className={`property role ${data?.role?.name}`}>
      {data?.role && generateRoleIcon(data?.role?.name)}
      <span>{data?.role?.name ? data?.role?.name.toUpperCase() : "..."}</span>
    </div>
  );
};

export default UserRole;
