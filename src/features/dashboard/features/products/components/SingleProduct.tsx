import { IProductExtendedByFn } from "../types/product";
import "../styles/single-product.css";
import SingleProductExtended from "./SingleProductExtended";
import SingleProductShort from "./SingleProductShort";

const SingleProduct = (props: IProductExtendedByFn) => {
  return (
    <div
      className={`product${props.openedProduct === props.id ? " selected" : ""}`}
    >
      <SingleProductShort {...props} />
      <SingleProductExtended {...props} />
    </div>
  );
};

export default SingleProduct;
