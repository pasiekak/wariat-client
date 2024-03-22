import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../features/dashboard/features/users/types/IUser";
import { singleAttribute } from "../types/singleAttribute";
import { IRole } from "../types/IRole";
import { ICategory } from "../types/ICategory";
import { IProduct } from "../../features/dashboard/features/products/types/product";

type useAxiosGetProps = {
  url: string;
};
type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    user?: IUser;
    users?: IUser[];
    categories: ICategory[];
    products: IProduct[];
    singleAttribute?: singleAttribute;
    body?: IRole[];
  };
  error: string;
  loading: boolean;
};

const useAxiosGet = ({ url }: useAxiosGetProps): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};

export default useAxiosGet;
