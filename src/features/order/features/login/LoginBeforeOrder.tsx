import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./styles/login-before-order.css";
import LoginFormV2 from "../../../account/features/auth/features/loginv2/components/LoginFormV2";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faTags } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const LoginBeforeOrder = () => {
  const { setAsGuest } = useContext(OrderContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.login-before-order",
  });
  const navigate = useNavigate();

  const orderAsGuest = () => {
    setAsGuest(true);
    navigate("/order/delivery");
  };

  return (
    <div className={`login-before-order`}>
      <LoginFormV2 />
      <div className={`as-guest-wrapper`}>
        <h2>{t("as-guest-title")}</h2>
        <p>{t("as-guest-text")}</p>
        <Button onClick={orderAsGuest} variant={`outline-dark`}>
          {t("as-guest-title")}
        </Button>
      </div>
      <div className={`register-info-wrapper`}>
        <h2>{t("register-info-title")}</h2>
        <div className={`info`}>
          <div>
            <FontAwesomeIcon icon={faTags} />
            <span>{t("register-info-discounts")}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faReceipt} />
            <span>{t("register-info-receipts")}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} />
            <span>{t("register-info-time")}</span>
          </div>
        </div>
        <Button onClick={() => navigate("/register")} variant={`outline-dark`}>
          {t("register-info-title")}
        </Button>
      </div>
    </div>
  );
};

export default LoginBeforeOrder;
