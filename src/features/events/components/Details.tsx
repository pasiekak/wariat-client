import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type DetailsProps = {
  date?: string | Date;
  place?: string;
  showLabels?: boolean;
};

const Details = ({ date, place, showLabels = true }: DetailsProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.events" });
  return (
    <div className="details">
      {place && (
        <>
          <FontAwesomeIcon icon={faMapLocationDot} />
          <div>
            {showLabels && <span>{t("place")}</span>}
            <span>{place}</span>
          </div>
        </>
      )}
      {date && (
        <>
          <FontAwesomeIcon icon={faCalendar} />
          <div>
            {showLabels && <span>{t("date")}</span>}
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
