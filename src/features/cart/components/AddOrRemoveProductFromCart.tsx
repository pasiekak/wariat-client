import { useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { CartProduct } from "../types/CartContextTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import PortalToBody, { forwarded } from "../../portals/PortalToBody";
import QuickSummary from "../features/quick-summary/QuickSummary";

const AddOrRemoveProductFromCart = (props: CartProduct) => {
  const { isProductInCart, addProductToCart, removeProductFromCart } =
    useContext(CartContext);

  const ref = useRef<forwarded>(null);

  const handleClick = () => {
    if (isProductInCart(props.product.id)) {
      removeProductFromCart(props.product.id);
    } else {
      addProductToCart(props);
      showSummary();
    }
  };

  const showSummary = () => {
    if (ref.current) ref.current.show();
  };

  const hideSummary = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button
        variant={"dark"}
        onClick={handleClick}
        className={`add-delete-product-from-cart`}
      >
        {isProductInCart(props.product.id) ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faCartPlus} />
        )}
      </Button>
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
    </>
  );
};

export default AddOrRemoveProductFromCart;
