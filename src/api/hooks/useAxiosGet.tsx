import { useEffect, useState } from "react";
import axios from "axios";

type useAxiosGetProps = {
  url: string;
};

const useAxiosGet = ({ url }: useAxiosGetProps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export default useAxiosGet;
