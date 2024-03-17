import { IUser } from "../types/IUser";
import UserPersonalData from "./UserPersonalData";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <div className="user">
      <div className="id">{user.id}</div>
      <UserPersonalData id={user.id} />
    </div>
  );
};

export default UserCard;
