import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type MiniEventProps = {
  id: number;
  title: string;
  createdAt: Date;
  published: boolean;
};

const MiniEvent = (props: MiniEventProps) => {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (eventID) {
      if (parseInt(eventID) === props.id) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setSelected(false);
    }
  }, [eventID]);

  return (
    <div
      className={`mini-event solo${selected ? " selected" : ""}`}
      onClick={() => navigate(`/dashboard/events/${props.id}`)}
    >
      <h5 className="title">{props.title}</h5>
      <div className="date">
        <FontAwesomeIcon icon={faClock} />
        <span>{new Date(props.createdAt).toLocaleString()}</span>
      </div>
      <span
        className={`publication${props.published ? " published" : " not-published"}`}
      >
        {props.published ? "Opublikowany" : "Nieopublikowany"}
      </span>
    </div>
  );
};

export default MiniEvent;
