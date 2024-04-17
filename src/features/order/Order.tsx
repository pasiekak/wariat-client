import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useTranslation } from "react-i18next";

import "./styles/styles";
import QuickSummary from "../cart/features/quick-summary/QuickSummary";

const Order = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.order" });

  return (
    <section className="order bck-smooth">
      <Navigation />
      <Outlet />
      <QuickSummary type={"in-order"} withColumns={false} />
    </section>
  );
};

export default Order;
