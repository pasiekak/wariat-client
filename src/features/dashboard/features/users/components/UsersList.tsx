import { IUser } from "../types/IUser";
import UserCard from "./UserCard";

import "../styles/users-list.css";

const UsersList = ({ users }: { users: IUser[] }) => {
  return (
    <div className="users-list">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UsersList;
