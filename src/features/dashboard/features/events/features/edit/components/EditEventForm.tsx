import { useOutletContext } from "react-router-dom";
import { useEventsFunctionsReturnedFunctions } from "../../../types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "../../../../../../../api/types/IEvent";
import Button from "react-bootstrap/Button";

import "../styles/edit-event-form.css";

const EditEventForm = ({ eventID }: { eventID: number }) => {
  const { getEvent, updateEvent } =
    useOutletContext<useEventsFunctionsReturnedFunctions>();

  const { register, handleSubmit, reset } = useForm<IEvent>();

  useEffect(() => {
    reset(getEvent(eventID));
  }, [reset, getEvent, eventID]);

  const onSubmit = (data: IEvent) => {
    if (data.youtubeURL === "") data.youtubeURL = null;
    const extracted = {
      title: data.title,
      place: data.place,
      date: data.date,
      youtubeURL: data.youtubeURL,
      content: data.content,
      published: data.published,
    };
    if (eventID) {
      updateEvent(eventID, extracted);
    }
  };

  return (
    <form className="edit-event-form solo" onSubmit={handleSubmit(onSubmit)}>
      <h4>Edycja danych tekstowych</h4>

      <div className="field">
        <label htmlFor="title">Tytuł wydarzenia</label>
        <input id="title" type="text" required {...register("title")} />
      </div>

      <div className="field">
        <label htmlFor="place">Miejsce*</label>
        <input type="text" id="place" required {...register("place")} />
      </div>

      <div className="field">
        <label htmlFor="date">Data wydarzenia*</label>
        <input
          type="date"
          id="date"
          required
          {...register("date", { valueAsDate: true })}
        />
      </div>

      <div className="field">
        <label htmlFor="content">Zawartość tekstowa</label>
        <textarea id="content" required {...register("content")} />
      </div>

      <div className="field">
        <label
          htmlFor="youtube-url-id"
          title="Adres URL filmiku z youtube. Wskazówki: https://www.youtube.com/embed/6R9L0Z-NsJ8 (Musi zawierać 'embed/' zamiast 'watch?v=')"
        >
          Link youtube
        </label>
        <input
          type="text"
          placeholder="https://www.youtube.com/embed/6R9L0Z-NsJ8 (Musi zawierać 'embed/' zamiast 'watch?v=')"
          id="youtube-url-id"
          {...register("youtubeURL")}
        />
      </div>

      <div className="field">
        <input id="published" type="checkbox" {...register("published")} />
        <label htmlFor="published">
          Czy chcesz żeby wydarzenie było widoczne dla klientów?
        </label>
      </div>

      <Button type="submit" variant="dark">
        Zatwierdź zmiany
      </Button>
    </form>
  );
};

export default EditEventForm;
