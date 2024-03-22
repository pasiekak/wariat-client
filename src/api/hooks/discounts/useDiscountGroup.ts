import { useEffect, useState } from "react";
import axios from "axios";
import { IDiscountGroup } from "../../types/IDiscountGroup";

type useDiscountGroupProps = {
  userID?: number;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    discountGroup?: IDiscountGroup;
    discountGroups?: IDiscountGroup[];
  };
  error: string;
  loading: boolean;
};

const useDiscountGroup = ({
  userID,
}: useDiscountGroupProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        userID ? `/api/users/${userID}/discountGroup` : "/api/discountGroups",
      )
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [userID]);
  return { data, error, loading };
};

export default useDiscountGroup;
