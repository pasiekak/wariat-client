import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type QuantityProps = {
  productID: number;
  type: "after-add" | "in-cart";
};

const Quantity = (props: QuantityProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { cartProducts, changeProductQuantity } = useContext(CartContext);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.cart.quick-summary",
  });

  useEffect(() => {
    const product = cartProducts.find(
      (ob) => ob.product.id === props.productID,
    );
    if (product) setQuantity(product.quantity);
  }, [cartProducts, props.productID]);

  useEffect(() => {
    changeProductQuantity(quantity, props.productID);
  }, [quantity, props.productID, changeProductQuantity]);

  useEffect(() => {
    return () => stopCounter();
  }, []);
  const startCounter = (type: "inc" | "dec") => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (type === "inc") {
        setQuantity((prev) => prev + 1);
      } else if (type === "dec") {
        setQuantity((prev) => prev - 1);
      }
    }, 125);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }
  };

  if (props.type === "after-add")
    return (
      <div className={`quantity`}>
        <span>{quantity}</span>
        <span>{t("quantity-text")}</span>
      </div>
    );
  if (props.type === "in-cart")
    return (
      <div className={"quantity-wrapper"}>
        <FontAwesomeIcon
          className={"decrease"}
          icon={faAngleLeft}
          onClick={() => changeProductQuantity(quantity - 1, props.productID)}
          onMouseDown={() => startCounter("dec")}
          onMouseUp={stopCounter}
          onMouseLeave={stopCounter}
        />
        <div className={`quantity`}>
          <span>{quantity}</span>
          <span>{t("quantity-text")}</span>
        </div>
        <FontAwesomeIcon
          className={"increase"}
          icon={faAngleRight}
          onClick={() => changeProductQuantity(quantity + 1, props.productID)}
          onMouseDown={() => startCounter("inc")}
          onMouseUp={stopCounter}
          onMouseLeave={stopCounter}
        />
      </div>
    );
  return null;
};

export default Quantity;
