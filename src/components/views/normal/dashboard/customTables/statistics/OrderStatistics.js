import { useLayoutEffect, useState } from "react";

import orderActions from "../../../../../../api/orderActions";

import './order-statistics.css';

const OrderStatistics = () => {
    const [statistics, setStatistics] = useState(null)
    useLayoutEffect(() => {
        orderActions.getOrderStatistics().then(res => {
            if (res.success) {
                setStatistics(res.statistics);
            }
        })
    }, [])

    return (
        <div className={`statistics ${statistics ? 'open' : ''}`}>
            {statistics && statistics.map((stat, index) => {
                return <div className="single-stat" key={index}>
                    <span className="value">{stat.value}</span>
                    <span className="label">{stat.name}</span>
                </div>
            })}
        </div>
    )
}

export default OrderStatistics;