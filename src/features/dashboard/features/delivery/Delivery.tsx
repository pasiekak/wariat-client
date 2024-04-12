import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../types/IOutletContext";
import { useEffect, useState } from "react";

import "./styles/delivery.css";
import AddDelivery from "./components/AddDelivery";
import { IDelivery } from "../../../../api/types/IDelivery";
import useAxiosGet from "../../../../api/hooks/useAxiosGet";
import Deliveries from "./components/Deliveries";

const Delivery = () => {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const outletContext = useOutletContext<IDefaultOutletContext>();
  const { data } = useAxiosGet<IDelivery[]>({ url: `/api/delivery` });

  useEffect(() => {
    if (data) {
      setDeliveries(data);
    }
  }, [data]);

  useEffect(() => {
    outletContext.setTableName("delivery");
  }, [outletContext]);
  const addDelivery = (delivery: IDelivery) => {
    setDeliveries((prev) => [...prev, delivery]);
  };

  const deleteDelivery = (delivery: IDelivery) => {
    setDeliveries((prev) => prev.filter((p) => p.id !== delivery.id));
  };

  return (
    <section className={`delivery`}>
      <h1 className="solo">Sposoby dostawy</h1>
      <Deliveries deliveries={deliveries} deleteDelivery={deleteDelivery} />
      <AddDelivery addDelivery={addDelivery} />
    </section>
  );
};

export default Delivery;
