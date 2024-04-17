import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import { CartContextReturns, CartProduct } from "../types/CartContextTypes";
import { useSessionStorage } from "../../../hooks/useStorage";
import { calculateFinalPrice } from "../../../utils/priceFunctions";

export const CartContext = createContext<CartContextReturns>(
  {} as CartContextReturns,
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartProducts, setCartProducts] = useSessionStorage<CartProduct[]>(
    "cart-products",
    [],
  );
  const [count, setCount] = useSessionStorage<number>("cart-count", 0);
  const [priceForAll, setPriceForAll] = useSessionStorage<number>(
    "cart-price-for-all",
    0,
  );
  const [priceForAllWithoutDiscounts, setPriceForAllWithoutDiscounts] =
    useSessionStorage<number>("cart-price-for-all-without-discounts", 0);

  useEffect(() => {
    setCount(cartProducts.length);
    setPriceForAll((prev) => {
      const onlyPrices = cartProducts.map((ob) => ob.fullPrice);
      return Number(
        onlyPrices
          .reduce((acc, currentValue) => acc + currentValue, 0)
          .toFixed(2),
      );
    });
    setPriceForAllWithoutDiscounts((prev) => {
      const onlyPrices = cartProducts.map((ob) => ob.fullPriceWithoutDiscount);
      return Number(
        onlyPrices
          .reduce((acc, currentValue) => acc + currentValue, 0)
          .toFixed(2),
      );
    });
  }, [cartProducts, setCount, setPriceForAll, setPriceForAllWithoutDiscounts]);

  const addProductToCart = (cartProduct: CartProduct) => {
    setCartProducts((prev) => [...prev, cartProduct]);
  };

  const removeProductFromCart = (productID: number) => {
    setCartProducts((prev) => prev.filter((p) => p.product.id !== productID));
  };

  const isProductInCart = (productID: number) => {
    return cartProducts.some((p) => p.product.id === productID);
  };

  const getProductFromCart = (productID: number) => {
    return cartProducts.find((p) => p.product.id === productID);
  };

  const getDiscountDifference = () => {
    return priceForAllWithoutDiscounts - priceForAll;
  };

  const clearCart = () => {
    setCartProducts([]);
    setCount(0);
    setPriceForAll(0);
  };

  const changeProductQuantity = useCallback(
    (newQuantity: number, productID: number) => {
      setCartProducts((prevState) => {
        return prevState.map((cartProduct) => {
          const ok =
            cartProduct.product.id === productID &&
            newQuantity > 0 &&
            newQuantity <= cartProduct.product.maxQuantity;
          if (ok) {
            return {
              ...cartProduct,
              fullPrice: calculateFinalPrice(
                cartProduct.product.priceBrutto,
                cartProduct?.bestDiscount
                  ? cartProduct.bestDiscount.percentage
                  : 0,
                newQuantity,
              ),
              fullPriceWithoutDiscount: calculateFinalPrice(
                cartProduct.product.priceBrutto,
                0,
                newQuantity,
              ),
              quantity: newQuantity,
            };
          }
          return cartProduct;
        });
      });
    },
    [setCartProducts],
  );

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        count,
        priceForAll,
        priceForAllWithoutDiscounts,
        changeProductQuantity,
        clearCart,
        addProductToCart,
        removeProductFromCart,
        isProductInCart,
        getProductFromCart,
        getDiscountDifference,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
