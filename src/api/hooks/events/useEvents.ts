import { useEffect, useState } from "react";
import axios from "axios";
import { IEvent } from "../../types/IEvent";
import { IEventsItems } from "../../../features/dashboard/types/items";

type useEventsProps = {
  eventID?: number;
};

export type returnedObject = {
  data: null | {
    success: boolean;
    message: string;
    events: IEvent;
    items: IEventsItems;
  };
  error: string;
  loading: boolean;
};

const useCategory = ({ eventID }: useEventsProps = {}): returnedObject => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(eventID ? `/api/events/${eventID}` : "/api/events")
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [eventID]);
  return { data, error, loading };
};

export default useCategory;
