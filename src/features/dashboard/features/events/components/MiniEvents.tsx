import { IEventsItems } from "../../../types/items";
import MiniEvent from "./MiniEvent";

import "../styles/mini-events.css";

type MiniEventsProps = {
  events: IEventsItems;
};

const MiniEvents = ({ events }: MiniEventsProps) => {
  return (
    <div className="mini-events">
      <h4>Wydarzenia</h4>
      {events.rows.map((e) => (
        <MiniEvent
          id={e.id}
          title={e.title}
          createdAt={e.createdAt}
          published={e.published}
          key={e.id}
        />
      ))}
    </div>
  );
};

export default MiniEvents;
