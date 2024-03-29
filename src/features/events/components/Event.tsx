import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { EventsOutlet } from "../Events";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { IEvent } from "../../../api/types/IEvent";

import "../styles/event.css";
import Button from "react-bootstrap/Button";
import Details from "./Details";
import ImageCarousel from "../../image-carousel/ImageCarousel";

const Event = () => {
  const [event, setEvent] = useState<IEvent>();
  const navigate = useNavigate();
  const { data } = useOutletContext<EventsOutlet>();
  const { id } = useParams();
  const { t } = useTranslation(undefined, { keyPrefix: "components.events" });

  useEffect(() => {
    if (data && id) {
      const event = data.items.rows.find((e) => e.id === parseInt(id));
      setEvent(event);
    }
  }, [data, id]);

  return (
    <div className="event">
      {event && (
        <>
          <Details date={event.date} place={event.place} showLabels={false} />
          <h1 className="title">{event.title}</h1>
          <p className="desc">{event.content}</p>
          <h1 className="gallery-title">{t("gallery-title")}</h1>
          <ImageCarousel entityID={event.id} entityPlural={"events"} />
          <Button variant="dark" onClick={() => navigate("/events")}>
            {t("go-back-to-events")}
          </Button>
        </>
      )}
    </div>
  );
};

export default Event;
