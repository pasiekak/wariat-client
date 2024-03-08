import { useTranslation } from "react-i18next";
import { useContext } from "react";

import { CartContext } from "../../cart/context/cart";

import "../styles/order-summary.css";

const OrderSummary = ({ order }) => {
  const { t } = useTranslation(null, {
    keyPrefix: "components.order.summary.order-summary",
  });
  const orderDate = new Date(order.createdAt);
  const { priceGetters } = useContext(CartContext);
  return (
    <div className="order-summary">
      <div>
        <span>{t("title")}</span>
        <span id="status" className={order.status}>
          {t(order.status)}
        </span>
      </div>
      <div>
        <span>{t("order-created")}</span>
        <span>{orderDate.toLocaleDateString()}</span>
      </div>
      <div>
        <span>{t("order-time")}</span>
        <span>{orderDate.toLocaleTimeString()}</span>
      </div>
      {order.shippingAddress && (
        <div>
          <span>{t("delivery-fee")}</span>
          <span>{priceGetters.getDeliveryPrice(order.deliveryType)} zł</span>
        </div>
      )}
      <div>
        <span>{t("tax")}</span>
        <span>23%</span>
      </div>
      <div>
        <span>{t("total")}</span>
        <span>{order.total} zł</span>
      </div>
    </div>
  );
};
export default OrderSummary;
