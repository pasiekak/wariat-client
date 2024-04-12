import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Button from "react-bootstrap/Button";

const ClearCart = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.cart" });
  const { count, clearCart } = useContext(CartContext);

  if (count > 0)
    return (
      <Button
        className={`clear-cart-wrapper`}
        variant={"outline-dark"}
        onClick={clearCart}
      >
        <FontAwesomeIcon icon={faTrash} />
        <span>{t("clear-cart")}</span>
      </Button>
    );
  return null;
};

export default ClearCart;
