import { IDelivery } from "../../../../../api/types/IDelivery";
import { useTranslation } from "react-i18next";
import DeliveryIcon from "../../../../../components/deliveryIcon/DeliveryIcon";
import { useContext, useRef } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useFormContext } from "react-hook-form";
import Button from "react-bootstrap/Button";
import PortalToBody, { forwarded } from "../../../../portals/PortalToBody";
import InPostWidget from "../../../../../components/inpost-widget/InPostWidget";

type DeliveryOptionProps = {
  delivery: IDelivery;
};

const DeliveryOption = (props: DeliveryOptionProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.pick",
  });
  const { selectedDelivery, setSelectedParcel, selectedParcel } =
    useContext(OrderContext);
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();
  const portalRef = useRef<forwarded>(null);

  const handleInpostShow = () => {
    if (portalRef.current) portalRef.current.show();
  };

  const handleInpostSelect = (point: any) => {
    setValue("delivery", props.delivery.icon);
    setSelectedParcel({
      name: point.name,
      position: {
        latitude: point.location.latitude,
        longitude: point.location.longitude,
      },
      address_details: point.address_details,
    });
    clearErrors("parcel");
    if (portalRef.current) portalRef.current.hide();
  };

  return (
    <div
      className={`delivery-option${selectedDelivery?.id === props.delivery.id ? " selected" : ""} ${props.delivery.icon}`}
    >
      <input
        type="radio"
        id={`option${props.delivery.id}`}
        value={props.delivery.icon}
        {...register("delivery")}
      />
      <label htmlFor={`option${props.delivery.id}`}>
        {props.delivery.icon === null
          ? props.delivery.name
          : t(props.delivery.icon)}
      </label>
      <DeliveryIcon deliveryIcon={props.delivery.icon} />
      <span className="price">{props.delivery.price.toFixed(2)} zł</span>
      {props.delivery.icon === "inpost-parcel" && (
        <Button
          variant="outline-dark"
          className={`inpost-button${errors.parcel ? " required" : ""}`}
          onClick={handleInpostShow}
        >
          {selectedParcel
            ? t("inpost-parcel-change-button")
            : t("inpost-parcel-pick-button")}
        </Button>
      )}
      {props.delivery.icon === "inpost-parcel" && selectedParcel && (
        <span className={`parcel-info`}>
          {t("selected-parcel", {
            address_details: selectedParcel.address_details,
          })}
        </span>
      )}
      {props.delivery.icon === "inpost-parcel" && (
        <PortalToBody
          ref={portalRef}
          child={
            <InPostWidget
              handleInpostSelect={handleInpostSelect}
              initialPosition={
                selectedParcel
                  ? {
                      latitude: selectedParcel.position.latitude,
                      longitude: selectedParcel.position.longitude,
                    }
                  : undefined
              }
            />
          }
        />
      )}
    </div>
  );
};

export default DeliveryOption;
