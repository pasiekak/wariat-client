import { IEvent } from "../../../api/types/IEvent";
import useImagesRelatedToEntity from "../../../api/hooks/images/useImagesRelatedToEntity";

import defaultImage from "../../../assets/wariatLogoBlack.png";
import { useEffect, useState } from "react";
import Details from "./Details";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MiniEvent = (props: IEvent) => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.events" });
  const navigate = useNavigate();
  const [mainImageID, setMainImageID] = useState<number>();

  const { data, loading } = useImagesRelatedToEntity({
    id: props.id,
    entityPlural: "events",
    onlyMain: true,
  });

  const handleClick = () => {
    navigate(`/events/${props.id}`);
  };

  useEffect(() => {
    if (data) {
      setMainImageID(data.image.id);
    }
  }, [data]);

  return (
    <>
      <div className={`mini-event${loading ? " loading" : ""}`}>
        <div
          className="image-wrapper"
          style={{
            backgroundImage: `url(${mainImageID ? `/api/images/${mainImageID}` : defaultImage})`,
          }}
        ></div>
        <div>
          <h4 className="title">{props.title}</h4>
          <Details date={props.date} place={props.place} showLabels={false} />
          <span className="desc">{props.content}</span>
          <div className="button-wrapper">
            <Button variant="dark" onClick={handleClick}>
              {t("see-more")}
            </Button>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default MiniEvent;
