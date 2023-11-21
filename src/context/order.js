import { createContext, useEffect, useState } from "react";


export const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const [deliveryMethod, setDeliveryMethod] = useState(localStorage.getItem('delivery') || '');

    useEffect(() => {
        localStorage.setItem('delivery', deliveryMethod)
    },[deliveryMethod]);

    useEffect(() => {
        const deliveryMethod = localStorage.getItem('delivery');
        if(deliveryMethod) {
            setDeliveryMethod(deliveryMethod);
        }
    },[]);

    return (
        <OrderContext.Provider
          value={{
            deliveryMethod,
            setDeliveryMethod,
          }}
        >
          {children}
        </OrderContext.Provider>
      );
}