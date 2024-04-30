import { CartProduct } from "../../../types/CartContextTypes";
import useImagesRelatedToEntity from "../../../../../api/hooks/images/useImagesRelatedToEntity";

import defaultImage from "../../../../../assets/wariatLogoBlack.png";
import { useTranslation } from "react-i18next";
import Quantity from "./Quantity";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext.tsx";

type SummaryProductProps = {
  cartProduct: CartProduct;
  last: boolean;
  type: "after-add" | "in-cart" | "in-order";
};

const SummaryProduct = ({ cartProduct, last, type }: SummaryProductProps) => {
  const { data } = useImagesRelatedToEntity({
    id: cartProduct.product.id,
    entityPlural: "products",
    onlyMain: true,
  });
  const { removeProductFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { t } = useTranslation(undefined, {
    keyPrefix: "components.cart.quick-summary",
  });

  return (
    <div className={`summary-product`}>
      <div
        className={`image-wrapper`}
        style={{
          backgroundImage: `url(${data?.image ? `/api/images/${data.image.id}` : defaultImage})`,
        }}
      ></div>
      <span
        className={`name`}
        onClick={() => navigate(`/products/${cartProduct.product.id}`)}
      >
        {cartProduct.product.name}
      </span>
      <Quantity
        productID={cartProduct.product.id}
        type={type}
        max={cartProduct.product.maxQuantity}
      />
      <div className="price-wrapper">
        <span className={`price-after-discount`}>
          {cartProduct.fullPrice.toFixed(2)} zł
        </span>
        {cartProduct.bestDiscount !== null && (
          <span className={`price-before-discount`}>
            {cartProduct.fullPriceWithoutDiscount.toFixed(2)} zł
          </span>
        )}
      </div>
      {last && type === "after-add" && (
        <span className={`label`}>{t("recently-added")}</span>
      )}
      {type === "in-cart" && (
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => removeProductFromCart(cartProduct.product.id)}
          className="remove"
        />
      )}
    </div>
  );
};

export default SummaryProduct;
