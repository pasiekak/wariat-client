import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { CartProduct } from "../types/CartContextTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const AddOrRemoveProductFromCart = (props: CartProduct) => {
  const { isProductInCart, addProductToCart, removeProductFromCart } =
    useContext(CartContext);

  const handleClick = () => {
    if (isProductInCart(props.product.id)) {
      removeProductFromCart(props.product.id);
    } else {
      addProductToCart(props);
    }
  };

  return (
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
  );
};

export default AddOrRemoveProductFromCart;
