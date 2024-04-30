import { IProduct } from "../../../api/types/IProduct";
import { BestDiscount } from "../../../api/types/IBestDiscount";

export type CartContextReturns = {
  cartProducts: CartProduct[];
  count: number;
  priceForAll: number;
  priceForAllWithoutDiscounts: number;

  changeProductQuantity: (newQuantity: number, productID: number) => void;
  clearCart: () => void;
  addProductToCart: (cartProduct: CartProduct) => void;
  removeProductFromCart: (productID: number) => void;
  isProductInCart: (productID: number) => boolean;
  getProductFromCart: (productID: number) => CartProduct | undefined;
  getDiscountDifference: () => number;
  refreshCart: () => void;
};

export type CartProduct = {
  product: IProduct;
  quantity: number;
  fullPriceWithoutDiscount: number;
  fullPrice: number;
  bestDiscount: BestDiscount | null;
};
