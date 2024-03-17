import { useOutletContext } from "react-router-dom";
import { IUsersOutletContext } from "../../types/IOutletContext";
import { useEffect } from "react";

import "./styles/users.css";
import TableInfo from "../../components/table-info/TableInfo";
import UsersList from "./components/UsersList";

const Users = () => {
  const { tableName, setTableName, items, loading }: IUsersOutletContext =
    useOutletContext();

  useEffect(() => {
    setTableName("users");
  }, []);

  console.log(items);

  return (
    <section className="users">
      <TableInfo tableName={tableName} count={items.count} />
      {items.count > 0 && <UsersList users={items.rows} />}
    </section>
  );
};

export default Users;
