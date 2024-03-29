import MiniEvent from "./MiniEvent";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { EventsOutlet } from "../Events";
import { useTranslation } from "react-i18next";

const MiniEvents = () => {
  const { data, error, loading } = useOutletContext<EventsOutlet>();
  const { t } = useTranslation(undefined, { keyPrefix: "components.events" });

  return (
    <div className="events-wrapper">
      {loading && <h1>{t("loading")}</h1>}
      {data && (
        <>
          <h1>{t("title")}</h1>
          {data.items.rows.map((event) => (
            <MiniEvent key={event.id} {...event} />
          ))}
        </>
      )}
      {error && <h1>{t("error")}</h1>}
    </div>
  );
};

export default MiniEvents;
