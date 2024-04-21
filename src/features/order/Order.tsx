import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

import "./styles/styles";
import QuickSummary from "../cart/features/quick-summary/QuickSummary";

const Order = () => {
  return (
    <section className="order bck-smooth">
      <Navigation />
      <Outlet />
      <QuickSummary type={"in-order"} withColumns={false} />
    </section>
  );
};

export default Order;
