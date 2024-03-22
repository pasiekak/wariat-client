import { useEffect, useState } from "react";
import axios from "axios";
import { ICategory } from "../../types/ICategory";

type useCategoryProps = {
  categoryID?: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    categories?: ICategory[];
    category?: ICategory;
  };
  error: string;
  loading: boolean;
};

const useCategory = ({ categoryID }: useCategoryProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(categoryID ? `/api/categories/${categoryID}` : "/api/categories")
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [categoryID]);
  return { data, error, loading };
};

export default useCategory;
