import { IProduct } from "../../../api/types/IProduct";
import { BestDiscount } from "../../../api/types/IBestDiscount";

export type CartContextReturns = {
  cartProducts: CartProduct[];
  count: number;

  addProductToCart: (cartProduct: CartProduct) => void;
  removeProductFromCart: (productID: number) => void;
  isProductInCart: (productID: number) => boolean;
};

export type CartProduct = {
  product: IProduct;
  quantity: number;
  bestDiscount: BestDiscount | null;
};
