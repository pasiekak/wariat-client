import { useEffect, useState } from "react";
import axios from "axios";
import { IDiscount } from "../../types/IDiscount";

type useIndividualDiscountProps = {
  userID?: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    discount: IDiscount;
    discounts: IDiscount[];
  };
  error: string;
  loading: boolean;
};

const useIndividualDiscount = ({
  userID,
}: useIndividualDiscountProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(userID ? `` : "/api/discounts")
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [userID]);
  return { data, error, loading };
};

export default useIndividualDiscount;
