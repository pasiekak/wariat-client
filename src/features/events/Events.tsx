import React from "react";
import "./styles/events.css";
import { useTranslation } from "react-i18next";
import useEvents, { returnedObject } from "../../api/hooks/events/useEvents";
import { Outlet } from "react-router-dom";

export type EventsOutlet = returnedObject;

const Events = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.events" });
  const { data, error, loading } = useEvents();
  console.log(data);
  return (
    <section className="events bck-smooth">
      <Outlet context={{ data, error, loading }} />
    </section>
  );
};

export default Events;
