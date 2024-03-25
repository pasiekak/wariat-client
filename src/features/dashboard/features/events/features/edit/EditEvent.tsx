import EditEventForm from "./components/EditEventForm";

import "./styles/edit-event.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEventsFunctionsReturnedFunctions } from "../../types";
import Images from "../../../images/Images";

import "./styles/images.css";
import DeleteEventButton from "./components/DeleteEventButton";

const EditEvent = () => {
  const { eventID } = useParams();
  const { getEvent } = useOutletContext<useEventsFunctionsReturnedFunctions>();

  if (eventID && getEvent(parseInt(eventID))) {
    return (
      <div className="edit-event">
        <h4 className="solo">Zarządzanie wydarzeniem</h4>
        <EditEventForm eventID={parseInt(eventID)} />
        <Images
          className="solo"
          id={parseInt(eventID)}
          entityPlural={"events"}
        />
        <DeleteEventButton eventID={parseInt(eventID)} />
      </div>
    );
  }
  return null;
};

export default EditEvent;
