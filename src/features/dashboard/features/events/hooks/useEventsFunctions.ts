import { IEvent } from "../../../../../api/types/IEvent";
import {
  EventAddEditFnProps,
  EventImagesAddFnProps,
  useEventsFunctionsProps,
  useEventsFunctionsReturnedFunctions,
} from "../types";
import axios from "axios";
import IImage from "../../images/types/IImage";
import { useCallback } from "react";

const useEventsFunctions = ({
  events,
  setEvents,
  addBanner,
}: useEventsFunctionsProps): useEventsFunctionsReturnedFunctions => {
  const getEvent = useCallback(
    (id: number) => {
      return events.rows.find((ev) => ev.id === id);
    },
    [events],
  );

  const addEvent = async (
    data: EventAddEditFnProps,
  ): Promise<IEvent | null> => {
    let res = await axios.post("/api/events", data);
    if (res.status === 201) {
      setEvents((prevEvents) => {
        return {
          count: prevEvents.count + 1,
          rows: [...prevEvents.rows, res.data.event],
        };
      });
      return res.data.event;
    } else {
      return null;
    }
  };

  const addImagesToEvent = async ({
    eventID,
    images,
  }: EventImagesAddFnProps): Promise<IImage[] | null> => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    let res = await axios.post(`/api/images/events/${eventID}`, formData);
    if (res.status === 201) {
      return res.data.images;
    }
    return null;
  };

  const updateEvent = (eventID: number, event: EventAddEditFnProps) => {
    axios.put(`/api/events/${eventID}`, event).then((res) => {
      if (res.status === 200) {
        setEvents((prevEvents) => {
          return {
            ...prevEvents,
            rows: prevEvents.rows.map((e) => {
              if (e.id === eventID) {
                return { ...e, ...event };
              }
              return e;
            }),
          };
        });
        addBanner({
          message: "Pomyślnie edytowano wydarzenie.",
          type: "success",
        });
      }
    });
  };

  const deleteEvent = (eventID: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`/api/events/${eventID}`)
        .then((res) => {
          if (res.status === 200) {
            setEvents((prev) => {
              return {
                count: prev.count - 1,
                rows: prev.rows.filter((ev) => ev.id !== eventID),
              };
            });
            addBanner({
              message: "Udało się usunąć wydarzenie oraz jego zdjęcia.",
              type: "success",
            });
          }
          resolve(); // Rozwiązanie obietnicy po zakończeniu żądania axiosa
        })
        .catch((error) => {
          addBanner({
            message: "Nie udało się usunąć wydarzenia.",
            type: "error",
          });
          reject(error); // Odrzucenie obietnicy w przypadku błędu
        });
    });
  };

  const generateDefaultValues = () => {
    return {
      title: "",
      content: "",
      published: true,
      images: [],
    };
  };

  return {
    getEvent,
    addEvent,
    addImagesToEvent,
    deleteEvent,
    updateEvent,
    generateDefaultValues,
  };
};

export default useEventsFunctions;
