import { IDelivery } from "../../../../../api/types/IDelivery";
import { useTranslation } from "react-i18next";
import DeliveryIcon from "../../../../../components/deliveryIcon/DeliveryIcon";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useFormContext } from "react-hook-form";

type DeliveryOptionProps = {
  delivery: IDelivery;
};

const DeliveryOption = (props: DeliveryOptionProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.pick",
  });
  const { selectedDelivery } = useContext(OrderContext);
  const { register } = useFormContext();

  return (
    <div
      className={`delivery-option${selectedDelivery?.id === props.delivery.id ? " selected" : ""}`}
    >
      <input
        type="radio"
        id={`option${props.delivery.id}`}
        value={props.delivery.id}
        {...register("delivery")}
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
