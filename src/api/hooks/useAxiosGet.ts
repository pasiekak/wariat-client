import { useEffect, useState } from "react";
import axios from "axios";

type useAxiosGetProps = {
  url: string;
};
type returnedObject<T> = {
  data: T | null;
  error: string;
  loading: boolean;
};

const useAxiosGet = <T>({ url }: useAxiosGetProps): returnedObject<T> => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};

export default useAxiosGet;
