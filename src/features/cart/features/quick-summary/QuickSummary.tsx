import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import SummaryProduct from "./components/SummaryProduct";

import defaultImage from "../../../../assets/wariatLogoBlack.png";

import "./styles/quick-summary.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Columns from "./components/Columns";
import { OrderContext } from "../../../order/context/OrderContext.tsx";
import { AccountContext } from "../../../account/context/AccountContext.tsx";

type props = {
  hide?: () => void;
  type: "after-add" | "in-cart" | "in-order";
  withColumns: boolean;
};

const QuickSummary = (props: props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.cart.quick-summary",
  });
  const { refreshCart } = useContext(CartContext);
  const { isLogged } = useContext(AccountContext);
  const { selectedDelivery } = useContext(OrderContext);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    refreshCart();
  }, [isLogged]);

  return (
    <div
      className={`quick-summary${cart.count === 0 ? " empty" : ""} ${props.type}`}
      style={{ backgroundImage: `url(${defaultImage})` }}
    >
      {cart.count === 0 && (
        <div className={`empty-cart-wrapper`}>
          <h3>{t("empty-cart")}</h3>
        </div>
      )}
      {props.type === "after-add" && cart.count > 0 && (
        <h1>{t(`title-h1-${props.type}`)}</h1>
      )}
      {props.type === "in-cart" && cart.count > 0 && (
        <h3>{t(`title-h1-${props.type}`)}</h3>
      )}
      {props.type === "in-order" && cart.count > 0 && (
        <h3>{t(`title-h1-${props.type}`)}</h3>
      )}
      {cart.count > 0 && (
        <>
          <div className={`cart-products`}>
            {props.withColumns && <Columns />}
            {cart.cartProducts.map((ob, index) => (
              <SummaryProduct
                key={index}
                cartProduct={ob}
                type={props.type}
                last={index === cart.cartProducts.length - 1}
              />
            ))}
          </div>
          <div className={`prices-wrapper`}>
            {cart.priceForAll !== cart.priceForAllWithoutDiscounts && (
              <div className={`difference-wrapper`}>
                <span className={`you-save`}>{t("you-save")}</span>
                <span className={`difference`}>
                  {cart.getDiscountDifference().toFixed(2)} zł
                </span>
              </div>
            )}
            {selectedDelivery && (
              <div className={`delivery-price`}>
                <span className={"delivery-price-label"}>
                  {t("delivery-price-label")}
                </span>
                <span className={"delivery-price"}>
                  {selectedDelivery.price.toFixed(2)} zł
                </span>
              </div>
            )}
            <div>
              <span>{t("price-for-all")}</span>
              <span className={"price-for-all"}>
                {selectedDelivery
                  ? (cart.priceForAll + selectedDelivery.price).toFixed(2)
                  : cart.priceForAll.toFixed(2)}{" "}
                zł
              </span>
            </div>
          </div>
        </>
      )}

      <div className={`actions`}>
        {props.hide && (
          <Button variant="warning" onClick={props.hide}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {t("continue-shopping")}
          </Button>
        )}
        {props.hide && cart.count > 0 && (
          <Button
            variant="success"
            disabled={cart.count === 0}
            onClick={() => navigate("/cart")}
          >
            {t("go-to-cart")}
            <FontAwesomeIcon icon={faCartShopping} />
          </Button>
        )}
        {props.type === "in-cart" && (
          <>
            {cart.count > 0 && (
              <>
                <Button
                  variant={"warning"}
                  onClick={() => navigate("/products")}
                >
                  {t("continue-shopping")}
                </Button>
                <Button
                  variant="success"
                  disabled={cart.count === 0}
                  onClick={() => navigate("/order")}
                >
                  {t("go-to-delivery")}
                </Button>
              </>
            )}
            {cart.count === 0 && (
              <Button
                variant={"outline-success"}
                onClick={() => navigate("/products")}
              >
                {t("see-our-products")}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuickSummary;
