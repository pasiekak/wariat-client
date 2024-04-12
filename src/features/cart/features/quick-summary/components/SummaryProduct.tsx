import { CartProduct } from "../../../types/CartContextTypes";
import useImagesRelatedToEntity from "../../../../../api/hooks/images/useImagesRelatedToEntity";

import defaultImage from "../../../../../assets/wariatLogoBlack.png";
import { useTranslation } from "react-i18next";
import Quantity from "./Quantity";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type SummaryProductProps = {
  cartProduct: CartProduct;
  last: boolean;
  type: "after-add" | "in-cart";
};

const SummaryProduct = ({ cartProduct, last, type }: SummaryProductProps) => {
  const { data } = useImagesRelatedToEntity({
    id: cartProduct.product.id,
    entityPlural: "products",
    onlyMain: true,
  });
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
      <Quantity productID={cartProduct.product.id} type={type} />
      <span className={`price`}>{cartProduct.fullPrice.toFixed(2)}zł</span>
      {last && type === "after-add" && (
        <span className={`label`}>{t("recently-added")}</span>
      )}
      {type === "in-cart" && (
        <FontAwesomeIcon icon={faTrashCan} className="remove" />
      )}
    </div>
  );
};

export default SummaryProduct;
