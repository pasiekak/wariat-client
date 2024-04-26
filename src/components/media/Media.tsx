import { useTranslation } from "react-i18next";

import "./media.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

const Media = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.media" });

  return (
    <section className="media bck-smooth">
      <h1 className="title">{t("title")}</h1>
      <div className="images">
        <Link
          className="facebook svg-wrapper"
          to={"https://www.facebook.com/wariatgarage"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link
          className="instagram svg-wrapper"
          to={"https://www.instagram.com/wariat_garage/"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          className="tiktok svg-wrapper"
          to={"https://www.tiktok.com/@wariatgarage"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faTiktok} />
        </Link>
      </div>
    </section>
  );
};

export default Media;
