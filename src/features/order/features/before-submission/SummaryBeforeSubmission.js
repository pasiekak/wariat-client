import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { CartContext } from "../cart/context/cart";

import defaultImage from "../../../../assets/wariatLogoBlack.png";

import "./styles/summary-before-submission.css";

const SummaryBeforeSubmission = ({ performOrder, dispatch }) => {
  const order =
    JSON.parse(sessionStorage.getItem("order-before-submission")) || null;
  const { priceGetters } = useContext(CartContext);
  const { t } = useTranslation(null, { keyPrefix: "components.order.summary" });
  const { register, handleSubmit, watch, setValue } = useForm();
  const checkAll = watch("checkAll");
  useEffect(() => {
    if (checkAll) {
      setValue("check1", true);
      setValue("check2", true);
      setValue("check3", true);
    } else {
      setValue("check1", false);
      setValue("check2", false);
      setValue("check3", false);
    }
  }, [checkAll, setValue]);

  return (
    <div className="summary-before-submission bck-smooth">
      {order && (
        <div className="content-wrapper">
          <h3>{t("order-summary.title")}</h3>
          <section className="shipping">
            <h5>{t("order-summary.delivery-fee")}</h5>
            <div>
              <span>
                {t("customer-order.delivery-type")}: {order.deliveryType}
              </span>
              {order.deliveryAddress && (
                <span>
                  {t("delivery-address.title")}: {order.deliveryAddress.country}{" "}
                  {order.deliveryAddress.postalCode}{" "}
                  {order.deliveryAddress.city} {order.deliveryAddress.street}{" "}
                  {order.deliveryAddress.homeNumber}
                </span>
              )}
              <span>
                {t("customer-order.title2")}: {order.firstName} {order.lastName}{" "}
                {order.email} {order.phone}
              </span>
            </div>
          </section>
          <section className="billing">
            <h5>{t("billing-data.title2")}</h5>
            <span>
              {t("billing-data.settlement-document")}:{" "}
              {order.wantInvoice
                ? t("billing-data.invoice")
                : t("billing-data.receipt")}
            </span>
            {order.wantInvoice && (
              <>
                <span>
                  {t("billing-data.nip")}: {order.invoiceDetails.nip}
                </span>
                <span>
                  {t("billing-data.company-name")}:{" "}
                  {order.invoiceDetails.companyName}
                </span>
                <span>
                  {t("billing-data.country")}: {order.invoiceDetails.country}
                </span>
                <span>
                  {t("billing-data.city")}: {order.invoiceDetails.city}
                </span>
                <span>
                  {t("billing-data.postal-code")}:{" "}
                  {order.invoiceDetails.postalCode}
                </span>
                <span>
                  {t("billing-data.street")}: {order.invoiceDetails.street}
                </span>
                <span>
                  {t("billing-data.building-number")}:{" "}
                  {order.invoiceDetails.buildingNumber}
                </span>
              </>
            )}
          </section>
          <section className="products">
            <h5>{t("products-summary-table.title2")}</h5>
            {order.products.map((product) => (
              <div className="product" key={product.id}>
                <img
                  src={
                    product.image
                      ? `/api/images/${product.image}`
                      : defaultImage
                  }
                  alt=""
                />
                <div className="product-details">
                  <span>{product.name}</span>
                  <span>
                    {t("products-summary-table.quantity")}: {product.quantity}
                  </span>
                  <span>
                    {t("products-summary-table.price-for-one")}:{" "}
                    {product.priceBrutto}
                  </span>
                  <span>
                    {t("products-summary-table.price-for-all")}:{" "}
                    {Number(product.priceBrutto * product.quantity).toFixed(2)}{" "}
                    zł
                  </span>
                </div>
              </div>
            ))}
          </section>
          <section>
            <div className="pricing">
              <span>{t("pricing.sum-netto")}: </span>
              <span>{priceGetters.getProductsNetto().toFixed(2)} zł</span>
              <span>{t("pricing.sum-brutto")}: </span>
              <span>{priceGetters.getProductsBrutto().toFixed(2)} zł</span>
              {priceGetters.getCartAfterGroupDiscount() && (
                <>
                  <span>{t("pricing.sum-after-group-discount")}: </span>
                  <span>
                    {priceGetters.getCartAfterGroupDiscount().toFixed(2)} zł
                  </span>
                </>
              )}
              <span>{t("pricing.delivery-fee")}: </span>
              <span>
                {Number(priceGetters.getDeliveryPrice()).toFixed(2)} zł
              </span>
              <span>{t("pricing.vat-tax")}: </span>
              <span>23%</span>
              <div className="final">
                <span>{t("pricing.total-price")}: </span>
                <span>{priceGetters.getCartTotal().toFixed(2)} zł</span>
              </div>
            </div>
          </section>
          <section>
            <Form
              onSubmit={handleSubmit((data) => {
                order.comment = data.comment;
                performOrder(order);
              })}
            >
              <Form.Control
                as="textarea"
                placeholder={t("comment-textarea-placeholder")}
                {...register("comment")}
              />
              <Form.Check label="Zaznacz wszystkie" {...register("checkAll")} />
              <Form.Check
                label="Regulamin wymagany nr.1"
                {...register("check1", { required: true })}
              />
              <Form.Check
                label="Regulamin wymagany nr.2"
                {...register("check2", { required: true })}
              />
              <Form.Check
                label="Regulamin wymagany nr.3"
                {...register("check3", { required: true })}
              />
              <div className="buttons">
                <Button
                  variant="outline-success"
                  onClick={() => dispatch({ type: "dec" })}
                >
                  {t("go-back-button")}
                </Button>
                <Button variant="primary" type="submit">
                  {t("place-an-order-button")}
                </Button>
              </div>
            </Form>
          </section>
        </div>
      )}
    </div>
  );
};

export default SummaryBeforeSubmission;
