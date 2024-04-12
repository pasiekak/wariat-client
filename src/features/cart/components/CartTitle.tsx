import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

type props = {
  withCount: boolean;
};

const CartTitle = (props: props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.cart" });
  const { count } = useContext(CartContext);

  return (
    <div className={`cart-title-wrapper`}>
      <h1>
        {t("title")}
        {props.withCount && <span> ({count})</span>}
      </h1>
    </div>
  );
};

export default CartTitle;
