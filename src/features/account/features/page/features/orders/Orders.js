import { useTranslation } from "react-i18next";

import Spinner from 'react-bootstrap/Spinner';
import './styles/orders.css';
import { useEffect, useState } from "react";
import orderActions from "../../../../../../api/orderActions";
import OrderListItem from "./components/OrderListItem";

const Orders = ({username}) => {
    const { t } = useTranslation(null, { keyPrefix: "components.account.orders"})
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        orderActions.getUserOrders(username).then(res => {
            console.log(res);
            if(res.success) {
                setOrders(res.orders)
            } else {

            }
        })
    }, [username])

    return (
        
        <div className={`orders ${!orders && 'loading'}`}>
            {orders ? 
            <>
            <h5 className="title">{t('title')}</h5>
            {orders.length > 0 ? 
                <div className="orders-wrapper">
                    <div className="headers">
                        <span>{t('id')}</span>
                        <span>{t('created-at')}</span>
                        <span>{t('status')}</span>
                        <span>{t('delivery-type')}</span>
                        <span>{t('total')}</span>
                    </div>
                    {orders.map(order => <OrderListItem order={order} key={order.id}/>)}
                </div> :
            <h6>{t('orders-empty')}</h6>}
            </> : <Spinner/>}
        </div> 
    )
}

export default Orders;