import { useEffect, useState } from "react";

import Spinner from 'react-bootstrap/Spinner'

import './orders.css';
import orderActions from "../../../../../api/orderActions";
import SingleOrder from "./single-order/SingleOrder";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderActions.getOrders().then(res => {
            if(res.success) {
                setOrders(res.data.orders);
                setLoading(false);
            }
        })
    },[])

    return (
        <div className={`dashboard-orders ${!orders && 'loading'}`}>
            
            {!loading && orders ? 
            <>
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
            </> : <Spinner/>}
        </div>
    )
}

export default Orders;