import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import orderActions from "../../../../../api/orderActions";
import Spinner from "react-bootstrap/esm/Spinner";

import './order-summary.css';

const OrderSummary = () => {
    const navigate = useNavigate();
    const orderID = useParams().orderID;
    const [order, setOrder] = useState(null);
    const { t: tErr } = useTranslation(null, {keyPrefix: "apiMessages.order"})
    const { t } = useTranslation(null, {keyPrefix: 'components.order.order-summary'})
    useEffect(() => {
        orderActions.getOrder(orderID).then(res => {
            if(res.success) {
                setTimeout(() => {
                    setOrder(res.order);
                },1000)
            } else {
                alert(tErr(res.message));
                navigate('/')
            }
            return () => clearTimeout()
        })
    }, [orderID, navigate, tErr])

    return (
        <div className="OrderSummary bck-smooth" style={{justifyContent: !order && 'center', alignItems: !order && 'center'}}>
            {!order ? <Spinner/> : 
            <>
                <h1>{t('title')}</h1>
                <h2>{t('title-des1')}</h2>
                <div className="order-summary-wrapper">
                    <h4 className="order-number">{t('order-number')}: <span style={{color: "#0d6efd"}}>#{order.id}</span></h4>
                    <section id="products-summary">
                        <h6>Zamówione produkty</h6>
                    </section>
                </div>
            </>}
        </div>
    )
}

export default OrderSummary;