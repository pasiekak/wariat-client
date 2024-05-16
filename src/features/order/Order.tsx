import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

import "./styles/styles";

const Order = () => {
  return (
    <section className="order bck-smooth">
      <Navigation />
      <Outlet />
    </section>
  );
};

export default Order;
