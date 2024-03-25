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
  }, [getEvent, eventID]);

  const onSubmit = (data: IEvent) => {
    const extracted = (({ title, content, published }) => ({
      title,
      content,
      published,
    }))(data);
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
        <label htmlFor="content">Zawartość tekstowa</label>
        <textarea id="content" required {...register("content")} />
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
