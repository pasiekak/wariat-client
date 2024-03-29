import { useEffect, useState } from "react";
import axios from "axios";
import IImage from "../../../features/dashboard/features/images/types/IImage";

type useImagesRelatedToEntityProps = {
  entityPlural: "products" | "events";
  id: number;
  onlyMain?: boolean;
};

type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    images: IImage[];
    image: IImage;
  };
  error: string;
  loading: boolean;
};

const useImagesRelatedToEntity = ({
  id,
  entityPlural,
  onlyMain,
}: useImagesRelatedToEntityProps): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        onlyMain
          ? `/api/images/${entityPlural}/${id}/main`
          : `/api/images/${entityPlural}/${id}`,
      )
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [entityPlural, id, onlyMain]);
  return { data, error, loading };
};

export default useImagesRelatedToEntity;
