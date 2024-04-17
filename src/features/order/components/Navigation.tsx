import { useContext, useEffect, useRef } from "react";
import { OrderContext } from "../context/OrderContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { stage, setStage, asGuest } = useContext(OrderContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.navigation",
  });
  const navigationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!asGuest) {
      navigate("/order/delivery");
    }
  }, [asGuest, navigate]);

  useEffect(() => {
    if (navigationRef.current) {
      if (stage === 1) {
        navigationRef.current.className = "navigation stage-1";
      } else if (stage === 2) {
        navigationRef.current.className = "navigation stage-2";
      } else if (stage === 3) {
        navigationRef.current.className = "navigation stage-3";
      }
    }
  }, [navigationRef, stage]);

  useEffect(() => {
    switch (location.pathname) {
      case "/order":
        navigate("/order/login-before-order");
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
    return () => setStage(1);
  }, [location.pathname, setStage, navigate]);

  return (
    <div className="navigation" ref={navigationRef}>
      <div
        className={`stage${stage > 1 ? " done" : ""}${stage === 1 ? " current" : ""}`}
        data-title={
          stage >= 2
            ? asGuest
              ? t("first-stage-title-not-logged")
              : t("first-stage-title-logged")
            : t("first-stage-title")
        }
        onClick={() => {
          if (asGuest) navigate("/order/login-before-order");
        }}
        style={{ cursor: stage >= 2 ? "pointer" : "default" }}
        data-content={1}
      ></div>
      <div
        className={`stage${stage > 2 ? " done" : ""}${stage === 2 ? " current" : ""}`}
        data-title={t("second-stage-title")}
        data-content={2}
      ></div>
      <div
        className={`stage${stage > 3 ? " done" : ""}${stage === 3 ? " current" : ""}`}
        data-title={t("third-stage-title")}
        data-content={3}
      ></div>
    </div>
  );
};

export default Navigation;
