import Button from "react-bootstrap/Button";
import YesOrNo from "../../../../../../../components/yes-or-no/YesOrNo";
import { useOutletContext } from "react-router-dom";
import { useEventsFunctionsReturnedFunctions } from "../../../types";
import { useState } from "react";

const DeleteEventButton = ({ eventID }: { eventID: number }) => {
  const { deleteEvent } =
    useOutletContext<useEventsFunctionsReturnedFunctions>();
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <div className="delete-event-button solo">
      <Button
        style={{ width: "100%" }}
        variant="dark"
        onClick={() => setShowQuestion(true)}
      >
        Usuń wydarzenie
      </Button>
      {showQuestion && (
        <YesOrNo
          question={
            "Na pewno chcesz usunąć to wydarzenie? Zostaną usunięte jego zdjęcia oraz zawartość. Ta operacja jest nieodwracalna"
          }
          approveFn={() =>
            deleteEvent(eventID).then(() => setShowQuestion(false))
          }
          declineFn={() => setShowQuestion(false)}
        />
      )}
    </div>
  );
};

export default DeleteEventButton;
