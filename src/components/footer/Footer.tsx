import React from "react";
import { useTranslation } from "react-i18next";

import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import LanguageChanger from "../../features/language/components/LanguageChanger.tsx";

const Footer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.footer" });

  return (
    <footer>
      <div className="group contact">
        <Link className="title" to="/contact">
          <h5>{t("contact")}</h5>
        </Link>
        <Link className="phone svg-wrapper" to="/contact">
          <FontAwesomeIcon icon={faPhone} />
        </Link>
        <Link className="text" to="/contact">
          <span>+48 724 502 561</span>
        </Link>
        <Link className="envelope svg-wrapper" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} />
        </Link>
        <Link className="text" to="/contact">
          <span>wariatgarage@gmail.com</span>
        </Link>
      </div>
      <div className="group media">
        <Link className="title" to="/media">
          <h5>{t("see-also")}</h5>
        </Link>
        <Link
          className="facebook svg-wrapper"
          to={"https://www.facebook.com/wariatgarage"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link
          className="text"
          to={"https://www.facebook.com/wariatgarage"}
          target={"_blank"}
        >
          <span>Facebook</span>
        </Link>
        <Link
          className="instagram svg-wrapper"
          to={"https://www.instagram.com/wariat_garage/"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          className="text"
          to={"https://www.instagram.com/wariat_garage/"}
          target={"_blank"}
        >
          <span>Instagram</span>
        </Link>
        <Link
          className="tiktok svg-wrapper"
          to={"https://www.tiktok.com/@wariatgarage"}
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faTiktok} />
        </Link>
        <Link
          className="text"
          to={"https://www.tiktok.com/@wariatgarage"}
          target={"_blank"}
        >
          <span>Tiktok</span>
        </Link>
      </div>
      <div className="group language">
        <h5 className="title">{t("language")}</h5>
        <LanguageChanger />
      </div>
    </footer>
  );
};

export default Footer;
