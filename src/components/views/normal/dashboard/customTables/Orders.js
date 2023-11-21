import { useEffect, useState } from "react";

import orderActions from "../../../../../api/orderActions";

import Spinner from 'react-bootstrap/Spinner'
import SingleOrder from "./single-order/SingleOrder";
import SortingForm from "./sort/SortingForm";
import OrderStatistics from "./statistics/OrderStatistics";

import './orders.css';

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderActions.getOrders().then(res => {
            if(res.success) {
                setOrders(res.data.orders);
            }
            setLoading(false);
        })
    },[])

    return (
        <div className={`dashboard-orders${orders ? '' : ' loading'}`}>
            {!loading ? 
            <>
                <OrderStatistics/>
                <div className="actions">
                    <SortingForm setOrders={setOrders}/>
                </div>
                {orders && <>
                    <div className="headers">
                        <div>
                            <span>ID</span>
                        </div>
                        <div>
                            <span>Email</span>
                        </div>
                        <div>
                            <span>Status</span>
                        </div>
                        <div>
                            <span>Kwota</span>
                        </div>
                        <div>
                            <span>Dowód zakupu</span>
                        </div>
                        <div>
                            <span>Data złożenia</span>
                        </div>
                    </div>
                    <div className="orders-wrapper">
                        {orders.map(order => <SingleOrder order={order} key={order.id}/>)}
                    </div>
                </>}
                {!orders && <h4>Nie ma zamówień</h4>}
            </> : <Spinner/>}
        </div>
    )
}

export default Orders;