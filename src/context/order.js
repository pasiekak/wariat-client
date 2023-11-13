import { createContext, useContext, useEffect, useState } from "react";

import { CartContext } from "./cart";
import { AccountContext } from "./account";

export const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const { cartItems, isEmpty } = useContext(CartContext);
    const { discountGroup } = useContext(AccountContext);
    const [deliveryMethod, setDeliveryMethod] = useState(localStorage.getItem('delivery') || '');

    useEffect(() => {
        localStorage.setItem('delivery', deliveryMethod)
    },[deliveryMethod])

    useEffect(() => {
        const deliveryMethod = localStorage.getItem('delivery');
        if(deliveryMethod) {
            setDeliveryMethod(deliveryMethod);
        }
    },[])

    return (
        <OrderContext.Provider
          value={{
            cartItems,
            discountGroup,
            deliveryMethod,
            setDeliveryMethod,
            isEmpty,
          }}
        >
          {children}
        </OrderContext.Provider>
      );
}