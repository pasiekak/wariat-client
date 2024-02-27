import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import orderActions from "../../../../api/orderActions";
import Spinner from "react-bootstrap/esm/Spinner";

import ProductSummaryTable from "./components/ProductSummaryTable";
import OrderSummary from "./components/OrderSummary";
import CustomerOrder from "./components/CustomerOrder";
import DeliveryAddress from "./components/DeliveryAddress";
import BillingData from "./components/BillingData";
import Documents from "./components/Documents";

import defaultImage from "../../../../components/logo/wariatLogoBlack.png"

import './styles/summary.css';

const Summary = () => {
    const navigate = useNavigate();
    const orderID = useParams().orderID;
    const [order, setOrder] = useState(null);
    const { t: tErr } = useTranslation(null, {keyPrefix: "apiMessages.order"})
    const { t } = useTranslation(null, {keyPrefix: 'components.order.summary'})
    useEffect(() => {
        orderActions.getOrder(orderID).then(res => {
            if(res.success) {
                setTimeout(() => {
                    console.log(res.order);
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
        <div className="Summary bck-smooth" style={{justifyContent: !order && 'center', alignItems: !order && 'center'}}>
            {!order ? <Spinner/> : 
            <>
                <h1>{t('title')}</h1>
                <h2>{t('title-des1')}</h2>
                <div className="summary-wrapper">
                    <h3 id="order-number">{t('order-number')}: <span id="order-id">#{order.id}</span></h3>
                    <div className="summary">
                        <div className="left">
                            <section>
                                <ProductSummaryTable products={order.products} withDiscountPrices={order.discount.id !== 1}/>
                            </section>
                            <section>
                                <CustomerOrder order={order}/>
                            </section>
                            {order.billingData && <section>
                                <BillingData billing={order.billingData}/>
                            </section>}
                            {order.comment && <section>
                                <div className="comment">
                                    <span className='title'>{t('comment-title')}</span>
                                    <p>{order.comment}</p>
                                </div>
                            </section>}
                        </div>
                        <div className="right">
                            <img src={defaultImage} alt="" />
                            <section>
                                <OrderSummary order={order} />
                            </section>
                            {order.shippingAddress && <section>
                                <DeliveryAddress deliveryAddress={order.shippingAddress}/>
                            </section>}
                            <section>
                                <Documents orderID={order.id}/>
                            </section>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Summary;