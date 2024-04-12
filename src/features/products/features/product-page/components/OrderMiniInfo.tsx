import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../../../../api/hooks/useAxiosGet";
import { IDelivery } from "../../../../../api/types/IDelivery";
import { useEffect, useState } from "react";
import {
  faPercentage,
  faTruckRampBox,
} from "@fortawesome/free-solid-svg-icons";
import { BestDiscount } from "../../../../../api/types/IBestDiscount";

type OrderMiniInfoProps = {
  available: boolean;
  bestDiscount: BestDiscount | null;
};

const OrderMiniInfo = (props: OrderMiniInfoProps) => {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const { t } = useTranslation(undefined, { keyPrefix: "components.product" });

  const { data } = useAxiosGet<IDelivery[]>({ url: `/api/delivery` });

  useEffect(() => {
    if (data) setDeliveries(data);
  }, [data]);

  const renderAvailableInfo = () => {
    return (
      <div
        className={`info${props.available ? " available" : " not-available"}`}
      >
        {props.available ? (
          <>
            <FontAwesomeIcon icon={faCircleCheck} />
            <span>{t("product-is-available")}</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faCircleXmark} />
            <span>{t("product-is-not-available")}</span>
          </>
        )}
      </div>
    );
  };

  const renderDeliveryInfo = () => {
    const deliveriesWithoutFree = deliveries.filter((del) => del.price > 0);
    const lowDelivery = deliveriesWithoutFree.reduce((min, del) =>
      del.price < min.price ? del : min,
    );
    return (
      <div className={`info delivery-price`}>
        <FontAwesomeIcon icon={faTruckRampBox} />
        <span>{t("lowest-delivery-price", { price: lowDelivery.price })}</span>
      </div>
    );
  };

  const renderDiscountInfo = () => {
    return (
      <div className={`info discount`}>
        <FontAwesomeIcon icon={faPercentage} />
        <span>
          {t("you-have-discount", { discount: props.bestDiscount?.percentage })}
        </span>
      </div>
    );
  };

  return (
    <div className={`order-mini-info`}>
      {renderAvailableInfo()}
      {props.bestDiscount && renderDiscountInfo()}
      {deliveries.length > 0 && renderDeliveryInfo()}
    </div>
  );
};

export default OrderMiniInfo;
