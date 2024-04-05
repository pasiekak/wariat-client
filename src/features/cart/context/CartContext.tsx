import { createContext, PropsWithChildren, useState } from "react";
import { CartContextReturns, CartProduct } from "../types/CartContextTypes";

export const CartContext = createContext<CartContextReturns>(
  {} as CartContextReturns,
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [count, setCount] = useState<number>(cartProducts.length);

  const addProductToCart = (cartProduct: CartProduct) => {
    setCartProducts((prev) => [...prev, cartProduct]);
  };

  const removeProductFromCart = (productID: number) => {
    setCartProducts((prev) => prev.filter((p) => p.product.id !== productID));
  };

  const isProductInCart = (productID: number) => {
    return cartProducts.some((p) => p.product.id === productID);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        count,
        addProductToCart,
        removeProductFromCart,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
