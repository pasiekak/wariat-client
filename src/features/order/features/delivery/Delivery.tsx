import DeliveryPick from "./components/DeliveryPick";

import "./styles/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";
import { FormFields } from "./types/FormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/schema";

const Delivery = () => {
  const { selectedDelivery, setSelectedDelivery, availableDeliveries } =
    useContext(OrderContext);
  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedDelivery !== undefined) {
      console.log(selectedDelivery);
      setValue("selected", selectedDelivery.id.toString());
    }
  }, [selectedDelivery]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {};

  useEffect(() => {
    const selectedRadio = watch("selected");
    if (selectedRadio) {
      const id = parseInt(selectedRadio);
      const delivery = availableDeliveries.find(
        (delivery) => delivery.id === id,
      );
      if (delivery) {
        setSelectedDelivery(delivery);
      }
    }
  }, [watch("selected")]);

  return (
    <div className="delivery">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DeliveryPick register={register} />
        <Button type="submit">Zatwierdź</Button>
      </form>
    </div>
  );
};

export default Delivery;
