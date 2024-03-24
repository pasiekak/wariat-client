import DiscountsNavigation from "./components/DiscountsNavigation";
import { Outlet, useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../types/IOutletContext";
import { useEffect } from "react";

import "./styles/discounts.css";

const Discounts = () => {
  const outletContext = useOutletContext<IDefaultOutletContext>();

  useEffect(() => {
    outletContext.setTableName("discounts");
  }, [outletContext]);

  return (
    <section className="discounts">
      <DiscountsNavigation />
      <Outlet context={outletContext} />
    </section>
  );
};

export default Discounts;
