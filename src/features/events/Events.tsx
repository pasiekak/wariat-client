import React from "react";
import "./styles/events.css";
import useEvents, { returnedObject } from "../../api/hooks/events/useEvents";
import { Outlet } from "react-router-dom";

export type EventsOutlet = returnedObject;

const Events = () => {
  const { data, error, loading } = useEvents();
  return (
    <section className="events bck-smooth">
      <Outlet context={{ data, error, loading }} />
    </section>
  );
};

export default Events;
