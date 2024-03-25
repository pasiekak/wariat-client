import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { EventAddForm, useEventsFunctionsReturnedFunctions } from "../../types";
import Button from "react-bootstrap/Button";

import "./styles/add-event-form.css";
import { IEventsOutletContext } from "../../../../types/IOutletContext";
import { useState } from "react";

const AddEventForm = () => {
  const [disabled, setDisabled] = useState(false);
  const { addBanner } = useOutletContext<IEventsOutletContext>();
  const { addEvent, addImagesToEvent, generateDefaultValues } =
    useOutletContext<useEventsFunctionsReturnedFunctions>();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: generateDefaultValues(),
  });

  const onSubmit = (data: EventAddForm) => {
    setDisabled(true);
    addEvent(data)
      .then((res) => {
        if (res) {
          addImagesToEvent({ eventID: res.id, images: data.images }).then(
            (res) => {
              if (res) {
                addBanner({
                  message:
                    "Pomyślnie utworzono wydarzenie i zapisano jego zdjęcia.",
                  type: "success",
                });
              }
            },
          );
          reset(generateDefaultValues());
        }
      })
      .finally(() => setDisabled(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-event-form solo">
      <h2>Dodawanie wydarzenia i jego zdjęć</h2>

      <div className="field">
        <label htmlFor="title">Tytuł wydarzenia*</label>
        <input id="title" type="text" required {...register("title")} />
      </div>

      <div className="field">
        <label htmlFor="content">Zawartość*</label>
        <textarea id="content" required {...register("content")} />
      </div>

      <div className="field">
        <input id="published" type="checkbox" {...register("published")} />
        <label htmlFor="published">
          Czy chcesz od razu opublikować wydarzenie?
        </label>
      </div>

      <div className="field">
        <label htmlFor="images">Zdjęcia z wydarzenia*</label>
        <input
          type="file"
          id="images"
          multiple
          accept=".jpg,.png"
          required
          {...register("images")}
        />
      </div>

      <Button variant="dark" type="submit" disabled={disabled}>
        Dodaj wydarzenie
      </Button>

      <p>* - Pola wymagane</p>
    </form>
  );
};

export default AddEventForm;
