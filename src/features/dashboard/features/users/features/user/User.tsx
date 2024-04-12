import useAxiosGet from "../../../../../../api/hooks/useAxiosGet";
import UserCard from "../../components/UserCard";

import "./styles/user.css";
import UserProperties from "./components/UserProperties";
import { useParams } from "react-router-dom";
import Actions from "../../components/Actions";
import { IUser } from "../../../../../../api/types/IUser";

const User = () => {
  const { userID } = useParams();
  const { data, error, loading } = useAxiosGet<{
    success: boolean;
    message: string;
    user: IUser;
  }>({ url: `/api/users/${userID}` });
  return (
    <section className="user">
      {loading && "Ładowanie"}
      {data?.user && (
        <>
          <div className="top">
            <Actions />
            <UserCard user={data.user} withButton={false} />
          </div>
          <div className="bottom">
            <UserProperties />
          </div>
        </>
      )}
      {error && error}
    </section>
  );
};

export default User;
