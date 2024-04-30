import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CartContextReturns, CartProduct } from "../types/CartContextTypes";
import { useSessionStorage } from "../../../hooks/useStorage";
import { calculateFinalPrice } from "../../../utils/priceFunctions";
import axios from "axios";
import { IProduct } from "../../../api/types/IProduct.ts";
import { IDiscount } from "../../../api/types/IDiscount.ts";

export const CartContext = createContext<CartContextReturns>(
  {} as CartContextReturns,
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  // State
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
  const [refreshing, setRefreshing] = useState(false);

  // Other variables

  // Functions

  const addProductToCart = useCallback(
    (cartProduct: CartProduct) => {
      setCartProducts((prev) => [...prev, cartProduct]);
    },
    [setCartProducts],
  );

  const removeProductFromCart = useCallback(
    (productID: number) => {
      setCartProducts((prev) => prev.filter((p) => p.product.id !== productID));
    },
    [setCartProducts],
  );

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

  const refreshCart = useCallback(() => {
    if (cartProducts.length > 0 && !refreshing) {
      console.log("HELLO");
      for (let i = 0; i < cartProducts.length; i++) {
        const oldProduct = cartProducts[i];
        setRefreshing(true);
        axios
          .get(`/api/products/${cartProducts[i].product.id}`)
          .then((res) => {
            if (res.status === 200) {
              const product = res.data.product as IProduct;
              const quantity =
                product.maxQuantity < oldProduct.quantity
                  ? product.maxQuantity
                  : oldProduct.quantity;
              axios
                .get(`/api/products/${product.id}/best-discount`)
                .then((res) => {
                  const bestDiscount =
                    res.status === 200
                      ? (res.data.discount as IDiscount)
                      : null;
                  const fullPriceWithoutDiscount = calculateFinalPrice(
                    product.priceBrutto,
                    0,
                    quantity,
                  );
                  const fullPrice = calculateFinalPrice(
                    product.priceBrutto,
                    bestDiscount ? bestDiscount.percentage : 0,
                    quantity,
                  );
                  const newProduct = {
                    product,
                    quantity,
                    fullPriceWithoutDiscount,
                    fullPrice,
                    bestDiscount,
                  };
                  setCartProducts((prev) => {
                    return prev.map((p) => {
                      if (p.product.id === newProduct.product.id) {
                        return newProduct;
                      }
                      return p;
                    });
                  });
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => setRefreshing(false));
            } else {
              setRefreshing(false);
              removeProductFromCart(oldProduct.product.id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [cartProducts, refreshing, removeProductFromCart, setCartProducts]);

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

  // Effects

  // Effect which set count and prices everytime cartProducts changes
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

  useEffect(() => {}, [location.pathname]);

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
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
