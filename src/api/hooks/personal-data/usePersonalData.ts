import { useEffect, useState } from "react";
import axios from "axios";
import { IPersonalData } from "../../types/IPersonalData";

type useAxiosGetProps = {
  userID: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    personalData: IPersonalData;
  };
  error: string;
  loading: boolean;
};

const usePersonalData = ({ userID }: useAxiosGetProps): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/personalData/users/${userID}`)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [userID]);

  return { data, error, loading };
};

export default usePersonalData;
