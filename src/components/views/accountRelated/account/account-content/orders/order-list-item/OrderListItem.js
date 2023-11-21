import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OrderListItem = ({order}) => {
    const navigate = useNavigate();
    const { t } = useTranslation(null, { keyPrefix: "components.account.orders"});
    const createdAt = new Date(order.createdAt);

    return (
        <div className="order-item" onClick={() => navigate(`/order/${order.id}`)}>
            <span>#{order.id}</span>
            <span>{createdAt.toLocaleDateString()}</span>
            <span><span className={`status ${order.status}`}>{t(order.status)}</span></span>
            <span>{order.deliveryType}</span>
            <span>{order.price} zł</span>
        </div>
    )
}
export default OrderListItem;