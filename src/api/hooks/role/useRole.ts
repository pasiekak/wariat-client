import { useEffect, useState } from "react";
import axios from "axios";
import { IRole } from "../../types/IRole";

type useRoleProps = {
  roleID: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    role?: IRole;
    roles?: IRole[];
  };
  error: string;
  loading: boolean;
};

const useRole = ({ roleID }: useRoleProps): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/roles/${roleID}`)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [roleID]);

  return { data, error, loading };
};

export default useRole;
