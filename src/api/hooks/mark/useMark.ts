import { useEffect, useState } from "react";
import axios from "axios";
import { IMark } from "../../types/IMark";

type useMarkProps = {
  markID?: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    marks?: IMark[];
    mark?: IMark;
  };
  error: string;
  loading: boolean;
};

const useMark = ({ markID }: useMarkProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(markID ? `/api/marks/${markID}` : "/api/marks")
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [markID]);
  return { data, error, loading };
};

export default useMark;
