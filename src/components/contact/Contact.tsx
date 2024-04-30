import { useTranslation } from "react-i18next";

import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.contact" });

  return (
    <section className="contact bck-smooth">
      <h1>{t("title")}</h1>
      <div className="groups">
        <div className="group localisation">
          <h5>{t("localisation.title")}</h5>
          <FontAwesomeIcon icon={faLocationDot} />
          <span className="country">Polska</span>
          <span>42-134, Truskolasy</span>
          <span>ul. Opolska 18</span>
        </div>
        <div className="group hours">
          <h5>{t("hours.title")}</h5>
          <FontAwesomeIcon icon={faClock} />
          <span>{t("hours.mon-fri")}</span>
          <span>8:00 - 16:00</span>
          <span>{t("hours.sat")}</span>
          <span>8:00 - 13:00</span>
          <span>{t("hours.sun")}</span>
          <span>{t("hours.sun-text")}</span>
        </div>
      </div>
      <h1>{t("title-map")}</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.753894564973!2d18.823095533988!3d50.87275575917443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710bff825623a25%3A0xfd1cddbe9c9c623!2sSerwis%204x4%20Wariat%20Garage%20Marek%20Pasieka!5e0!3m2!1spl!2spl!4v1714225697695!5m2!1spl!2spl"
        allowFullScreen={false}
        loading="lazy"
        className="map"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Contact;
