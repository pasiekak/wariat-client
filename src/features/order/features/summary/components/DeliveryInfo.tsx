import { InpostAddressDetails } from "../../../../../components/inpost-widget/InpostPointType.ts";
import { IAddressForOrder } from "../../../../../api/types/IAddress.ts";
import { useTranslation } from "react-i18next";
import DeliveryIcon from "../../../../../components/deliveryIcon/DeliveryIcon.tsx";

type DeliveryInfoProps = {
  address: IAddressForOrder | null;
  delivery: string | null;
  parcel:
    | ({
        code: string;
      } & InpostAddressDetails)
    | null;
};

const DeliveryInfo = ({ address, delivery, parcel }: DeliveryInfoProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.delivery",
  });

  const renderDeliveryMessage = () => {
    if (!delivery) return;
    if (delivery.includes("courier"))
      return t("courier", {
        courier_name:
          delivery === "inpost-courier"
            ? "InPost"
            : delivery === "dpd-courier"
              ? "DPD"
              : "",
      });
    if (delivery.includes("parcel")) return t("parcel");
    if (delivery === "in-person") return t("in-person");
  };

  const renderAddressDetails = () => {
    if (!delivery) return;
    if (delivery.includes("courier") && address) return address;
    if (delivery.includes("parcel") && parcel)
      return {
        city: parcel.city,
        country: "Polska",
        homeNumber: parcel.building_number,
        postalCode: parcel.post_code,
        street: parcel.street,
      };
    // case for in-person delivery
    return {
      city: "Truskolasy",
      country: "Polska",
      homeNumber: 18,
      postalCode: "40-134",
      street: "Opolska",
    };
  };

  return (
    <div className="delivery-info-wrapper">
      <h3>{t("title")}</h3>
      {(delivery && delivery.includes("courier")) ||
        (delivery && delivery.includes("parcel") && (
          <DeliveryIcon deliveryIcon={delivery} />
        ))}
      <div>
        <span className="message">{renderDeliveryMessage()}</span>
        <span className="delivery-address">
          {t("delivery-address", { ...renderAddressDetails() })}
        </span>
      </div>
    </div>
  );
};

export default DeliveryInfo;
