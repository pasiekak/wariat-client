import { IEventsOutletContext } from "../../types/IOutletContext";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import "./styles/events.css";
import Button from "react-bootstrap/Button";
import useEventsFunctions from "./hooks/useEventsFunctions";
import MiniEvents from "./components/MiniEvents";

const Events = () => {
  const dashboardContext: IEventsOutletContext = useOutletContext();
  const eventsFunctions = useEventsFunctions({
    events: dashboardContext.items,
    setEvents: dashboardContext.setItems,
    addBanner: dashboardContext.addBanner,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dashboardContext.setTableName("events");
  }, [dashboardContext]);

  return (
    <section className="events">
      <div className="left">
        <div>
          <h1 className="solo">
            Panel zarządzania wydarzeniami i ich zawartością
          </h1>
        </div>
        <Outlet context={{ ...dashboardContext, ...eventsFunctions }} />
      </div>
      <div className="right">
        <div className="solo">
          <Button
            variant="dark"
            onClick={() => navigate("/dashboard/events/add")}
          >
            Dodaj wydarzenie
          </Button>
        </div>
        <MiniEvents events={dashboardContext.items} />
      </div>
    </section>
  );
};

export default Events;
