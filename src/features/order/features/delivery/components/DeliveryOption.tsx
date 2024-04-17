import { IDelivery } from "../../../../../api/types/IDelivery";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeliveryIcon from "../../../../../components/deliveryIcon/DeliveryIcon";
import { FormFields } from "../types/FormFields";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";

type DeliveryOptionProps = {
  delivery: IDelivery;
  register: UseFormRegister<FormFields>;
};

const DeliveryOption = (props: DeliveryOptionProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.pick",
  });
  const { selectedDelivery } = useContext(OrderContext);

  return (
    <div
      className={`delivery-option${selectedDelivery?.id === props.delivery.id ? " selected" : ""}`}
    >
      <input
        type="radio"
        value={props.delivery.id}
        id={`option${props.delivery.id}`}
        {...props.register(`selected`)}
      />
      <label htmlFor={`option${props.delivery.id}`}>
        {props.delivery.icon === null
          ? props.delivery.name
          : t(props.delivery.icon)}
      </label>
      <DeliveryIcon deliveryIcon={props.delivery.icon} />
      <span className="price">{props.delivery.price.toFixed(2)} zł</span>
    </div>
  );
};

export default DeliveryOption;
