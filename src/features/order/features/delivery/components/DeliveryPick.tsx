import { useContext } from "react";
import { UseFormRegister } from "react-hook-form";
import { OrderContext } from "../../../context/OrderContext";
import { useTranslation } from "react-i18next";
import DeliveryOption from "./DeliveryOption";
import { FormFields } from "../types/FormFields";

type DeliveryPickProps = {
  register: UseFormRegister<FormFields>;
};

const DeliveryPick = (props: DeliveryPickProps) => {
  const { availableDeliveries } = useContext(OrderContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.pick",
  });

  return (
    <div className="delivery-pick">
      <h2 className="title">{t("title")}</h2>
      {availableDeliveries.length > 0 && (
        <div className="delivery-options">
          {availableDeliveries.map((delivery, index) => (
            <DeliveryOption
              register={props.register}
              delivery={delivery}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryPick;
