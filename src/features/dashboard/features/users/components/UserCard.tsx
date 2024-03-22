import { IUser } from "../types/IUser";
import UserPersonalData from "./UserPersonalData";
import UserRole from "./UserRole";

import "../styles/user-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const UserCard = ({
  user,
  withButton = true,
}: {
  user: IUser;
  withButton?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="user-card">
      <div className="property username animated-underline">
        <span>{user.username}</span>
      </div>
      <div className="property email animated-underline">
        <FontAwesomeIcon icon={faEnvelope} />
        <span>{user.email}</span>
      </div>
      <UserPersonalData id={user.id} />
      <div className="property created-at animated-underline">
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>
          Dołączył dnia {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
      <UserRole roleID={user.RoleId} />
      {withButton && (
        <Button
          variant="dark"
          onClick={() => navigate(`/dashboard/users/${user.id}`)}
        >
          Zobacz więcej
        </Button>
      )}
    </div>
  );
};

export default UserCard;
