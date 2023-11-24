import { useState, useEffect, createContext, useContext } from "react";
import { AccountContext } from "./account";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    const [deliveryMethod, setDeliveryMethod] = useState(localStorage.getItem('delivery') || '');
    const { discountGroup } = useContext(AccountContext);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('delivery', deliveryMethod)
    },[deliveryMethod]);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
        setCartItems(JSON.parse(cartItems));
        }
    }, []);

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if(isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
                ) 
            )
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    }

    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        
        if (isItemInCart) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
        } 
    };

    const isInCart = (item) => {
        let result = cartItems.find((cartItem) => cartItem.id === item.id);
        if (result) return true;
        return false;
    }

    const updateQuantityInCart = (newQuantity, itemId) => {
        const updatedCart = [...cartItems];
        const productIndex = updatedCart.findIndex(item => item.id === itemId);
        if (productIndex !== -1) {
            if(newQuantity <= updatedCart[productIndex].maxQuantity) updatedCart[productIndex].quantity = newQuantity;
        }
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]); // set the cart items to an empty array
    };

    const isEmpty = () => {
        if (cartItems.length === 0) return true;
        return false;
    }

    const priceGetters = {
        getProductsNetto: () => {
            // calculate the total price of the items in the cart
            let totalNetto = priceGetters.getProductsBrutto() / 1.23;
            return totalNetto;
        },
        getProductsBrutto: () => {
            let totalBrutto = 0;
            cartItems.forEach(product => {
                totalBrutto += product.priceBrutto * product.quantity;
            })
            return totalBrutto;
        },
        getCartAfterGroupDiscount: () => {
            // calculate total price after group discount
            if (discountGroup?.id > 1) {
                const totalBrutto = priceGetters.getProductsBrutto();
                const discountFactor = 1 - discountGroup.percentage * 0.01;
                const totalBruttoAfterDiscount = totalBrutto * discountFactor;
                return totalBruttoAfterDiscount
            } else {
                return priceGetters.getProductsBrutto();
            }
        },
        getDeliveryPrice: (delMethod = deliveryMethod) => {
            switch(delMethod) {
              case 'DPD kurier przelew': return 17;
              case 'DPD kurier pobranie' : return 30;
              case 'InPost paczkomat przelew' : return 17;
              case 'Odbior osobisty' : return 0;
              default: return null;
            }
        },
        getCartTotal: () => {
            const afterDiscount = priceGetters.getCartAfterGroupDiscount();
            const final = afterDiscount + priceGetters.getDeliveryPrice();
            return final;
        }
    }
    const getCartCount = () => {
        return cartItems.length;
    }

    return (
        <CartContext.Provider
          value={{
            cartItems,
            deliveryMethod,
            priceGetters,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantityInCart,
            getCartCount,
            isInCart,
            isEmpty,
            setDeliveryMethod
          }}
        >
          {children}
        </CartContext.Provider>
      );
}