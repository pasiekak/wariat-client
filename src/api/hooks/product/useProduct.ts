import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../types/IProduct";

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    product?: IProduct;
  };
  error: string;
  loading: boolean;
};

const useProduct = (productID: number): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/products/${productID}`)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [productID]);
  return { data, error, loading };
};

export default useProduct;
