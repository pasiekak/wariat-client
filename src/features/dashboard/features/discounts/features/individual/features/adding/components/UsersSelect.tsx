import useAxiosGet from "../../../../../../../../../api/hooks/useAxiosGet";
import { useEffect, useState } from "react";
import { IUser } from "../../../../../../../../../api/types/IUser";
import { RegisterOptions } from "react-hook-form";

import "../styles/field.css";

type UsersSelectProps = {
  register: (name: "UserId", registerOptions: RegisterOptions) => object;
  changeUsersEmpty: (count: number) => void;
};

const UsersSelect = ({ register, changeUsersEmpty }: UsersSelectProps) => {
  const { data } = useAxiosGet<{
    success: boolean;
    message: string;
    users: IUser[];
  }>({
    url: "/api/users",
  });
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      changeUsersEmpty(data.users.length);
    } else {
      changeUsersEmpty(0);
    }
  }, [data, changeUsersEmpty]);

  if (users) {
    return (
      <div className="field select-wrapper">
        <label>Wybierz użytkownika</label>
        {users.length > 0 ? (
          <select required {...register("UserId", { valueAsNumber: true })}>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                ID Użytkownika: {user.id} Login: {user.username} Email:{" "}
                {user.email}
              </option>
            ))}
          </select>
        ) : (
          <span className="empty">
            Brak użytkowników, którym można by dać zniżkę
          </span>
        )}
      </div>
    );
  }
  return null;
};

export default UsersSelect;
