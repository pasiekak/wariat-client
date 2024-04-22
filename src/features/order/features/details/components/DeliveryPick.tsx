import { useContext, useEffect } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useTranslation } from "react-i18next";
import DeliveryOption from "./DeliveryOption";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields";

const DeliveryPick = () => {
  const { availableDeliveries, setSelectedDelivery } = useContext(OrderContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.pick",
  });
  const {
    watch,
    formState: {
      errors: { delivery: deliveryError },
    },
  } = useFormContext<FormFields>();
  const deliveryWatch = watch("delivery");

  // Integration of form input with context selected delivery
  useEffect(() => {
    if (deliveryWatch) {
      const delivery = availableDeliveries.find(
        (d) => d.icon === deliveryWatch,
      );
      if (delivery) {
        setSelectedDelivery(delivery);
      }
    }
  }, [deliveryWatch, setSelectedDelivery, availableDeliveries]);

  return (
    <div className="delivery-pick">
      <h2 className="title">{t("title")}</h2>
      {availableDeliveries.length > 0 && (
        <div className={`delivery-options${deliveryError ? " err" : ""}`}>
          {availableDeliveries.map((delivery, index) => (
            <DeliveryOption delivery={delivery} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryPick;
