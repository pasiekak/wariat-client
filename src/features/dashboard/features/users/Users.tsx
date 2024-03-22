import { useOutletContext } from "react-router-dom";
import { IUsersOutletContext } from "../../types/IOutletContext";
import { useEffect } from "react";

import "./styles/users.css";
import UsersList from "./components/UsersList";

const Users = () => {
  const { setTableName, items }: IUsersOutletContext = useOutletContext();

  useEffect(() => {
    setTableName("users");
  }, [setTableName]);

  return (
    <section className="users">
      {items.count > 0 && <UsersList users={items.rows} />}
    </section>
  );
};

export default Users;
