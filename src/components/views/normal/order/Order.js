import { useContext, useEffect, useReducer, useState } from "react";

import accountActions from "../../../../api/accountActions";

import { OrderContext } from "../../../../context/order";
import { AccountContext } from "../../../../context/account";
import Cart from "./cart/Cart";
import Delivery from "./delivery/Delivery";
import ReceiverData from "./receiver-data/ReceiverData";

import './order.css';
import orderActions from "../../../../api/orderActions";

const countReducer = (state, action) => {
    switch(action.type) {
        case 'inc':
            localStorage.setItem('order-index', JSON.stringify(state+1));
            return state + 1;
        case 'dec':
            localStorage.setItem('order-index', JSON.stringify(state-1));
            return state - 1;
        case 'setIndex':
            localStorage.setItem('order-index', JSON.stringify(action.value));
            return action.value;
        default: 
            return state;
    }
}

const Order = () => {
    const [access, setAccess] = useState(false);
    const [needAddress, setNeedAddress] = useState(true);
    const [index, dispatch] = useReducer(countReducer, localStorage.getItem('order-index') ? JSON.parse(localStorage.getItem('order-index')) : 1);
    const { cartItems, discountGroup, deliveryMethod, isEmpty } = useContext(OrderContext);
    const { address, companyData, personalData, user } = useContext(AccountContext);

    useEffect(() => {
        accountActions.verifyLoggedAccount().then(res => {
            setAccess(res.success);
            if(!res.success) dispatch({type: 'setIndex', value: 1})
        })
    }, [])

    useEffect(() => {
        if(isEmpty())  {
            dispatch({type: 'setIndex', value: 1})
            localStorage.setItem('order-index', JSON.stringify(1));
        }
    }, [isEmpty])

    useEffect(() => {
        if(deliveryMethod === 'Odbior osobisty') {
            setNeedAddress(false);
        } else {
            setNeedAddress(true);
        }
    }, [deliveryMethod])

    const performOrder = (data) => {
        const order = {
            items: cartItems,
            discount: discountGroup,
            deliveryMethod,
            receiverData: data
        }
        orderActions.makeOrder(order);
    }

    return (
        <>
            {index === 1 && <Cart dispatch={dispatch} access={access}/>}
            {index === 2 && <Delivery dispatch={dispatch} needAddress={needAddress}/>}
            {index === 3 && (address && personalData && companyData && user) && <ReceiverData dispatch={dispatch} performOrder={performOrder} 
            needAddress={needAddress} user={user} address={address} personalData={personalData} companyData={companyData}/>}
        </>
    )
}

export default Order;