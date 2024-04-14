import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useTranslation } from "react-i18next";

import "./styles/styles";

const Order = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.order" });

  return (
    <section className="order bck-smooth">
      <h1>{t("title")}</h1>
      <Navigation />
      <Outlet />
    </section>
  );
};

export default Order;
