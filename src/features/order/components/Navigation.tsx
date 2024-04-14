import { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { stage, setStage, asGuest } = useContext(OrderContext);
  const { t } = useTranslation(undefined, { keyPrefix: "components.order" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (stage === 1) {
      console.log(asGuest);
      // asGuest can be either undefined, false or true.
      // The undefined means that the user is not logged and he didn't click "order as guest"
      if (asGuest === undefined) {
        navigate("/order/login-before-order");
      } else {
        navigate("/order/delivery");
      }
    }
  }, [stage, asGuest]);

  useEffect(() => {
    switch (location.pathname) {
      case "/order":
        setStage(1);
        break;
      case "/order/login-before-order":
        setStage(1);
        break;
      case "/order/delivery":
        setStage(2);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="navigation">
      <div className={`stage${stage === 1 ? " current" : ""}`}>
        <span className={"stage-number"}>1</span>
        <span className={`stage-title`}>{t("first-stage-title")}</span>
      </div>
      <div className={`stage${stage === 2 ? " current" : ""}`}>
        <span className={"stage-number"}>2</span>
        <span className={`stage-title`}>{t("second-stage-title")}</span>
      </div>
      <div className={`stage${stage === 3 ? " current" : ""}`}>
        <span className={`stage-number`}>3</span>
        <span className={`stage-title`}>{t("third-stage-title")}</span>
      </div>
    </div>
  );
};

export default Navigation;
