import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../types/IProduct";

type useCategoryProps = {
  productID?: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    products?: IProduct[];
    product?: IProduct;
  };
  error: string;
  loading: boolean;
};

const useProduct = ({ productID }: useCategoryProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(productID ? `/api/products/${productID}` : "/api/products")
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [productID]);
  return { data, error, loading };
};

export default useProduct;
