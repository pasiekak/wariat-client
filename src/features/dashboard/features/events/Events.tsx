import { IEventsOutletContext } from "../../types/IOutletContext";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import "./styles/events.css";
import Button from "react-bootstrap/Button";

const Events = () => {
  const { setTableName }: IEventsOutletContext = useOutletContext();

  useEffect(() => {
    setTableName("events");
  }, [setTableName]);

  return (
    <section className="events">
      <div className="left">
        <div>
          <h1 className="solo">
            Panel zarządzania wydarzeniami i ich zawartością
          </h1>
        </div>
      </div>
      <div className="right">
        <div className="solo">
          <Button variant="dark">Dodaj wydarzenie</Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
