import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useContext, useRef } from "react";
import { CartContext } from "../../../../cart/context/CartContext";
import { IProduct } from "../../../../../api/types/IProduct";
import { BestDiscount } from "../../../../../api/types/IBestDiscount";
import PortalToBody, { forwarded } from "../../../../portals/PortalToBody";
import QuickSummary from "../../../../cart/features/quick-summary/QuickSummary";
import { calculateFinalPrice } from "../../../../../utils/priceFunctions";

type AddToCartActionsProps = {
  selectedQuantity: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  product: IProduct;
  bestDiscount: BestDiscount | null;
  available: boolean;
};

const AddToCartActions = (props: AddToCartActionsProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.product" });
  const cartContext = useContext(CartContext);

  const ref = useRef<forwarded>(null);
  const handleAdd = () => {
    cartContext.addProductToCart({
      product: props.product,
      bestDiscount: props.bestDiscount,
      quantity: props.selectedQuantity,
      fullPrice: calculateFinalPrice(
        props.product.priceBrutto,
        props.bestDiscount ? props.bestDiscount.percentage : 0,
        props.selectedQuantity,
      ),
      fullPriceWithoutDiscount: calculateFinalPrice(
        props.product.priceBrutto,
        0,
        props.selectedQuantity,
      ),
    });
    showSummary();
  };

  const handleRemove = () => {
    cartContext.removeProductFromCart(props.product.id);
  };

  const showSummary = () => {
    if (ref.current) ref.current.show();
  };

  const hideSummary = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <div className={`actions`}>
      <input
        type="number"
        min={1}
        max={props.product.maxQuantity}
        value={props.selectedQuantity}
        onChange={props.onChange}
        disabled={
          !props.available || cartContext.isProductInCart(props.product.id)
        }
      />
      {!cartContext.isProductInCart(props.product.id) && (
        <Button
          variant="warning"
          onClick={handleAdd}
          disabled={!props.available}
        >
          {t("add-to-cart")}
        </Button>
      )}
      {cartContext.isProductInCart(props.product.id) && (
        <Button
          variant="outline-dark"
          onClick={handleRemove}
          disabled={!props.available}
        >
          {t("remove-from-cart")}
        </Button>
      )}
      <PortalToBody
        ref={ref}
        child={
          <QuickSummary
            withColumns={false}
            type={"after-add"}
            hide={hideSummary}
          />
        }
      />
    </div>
  );
};

export default AddToCartActions;
