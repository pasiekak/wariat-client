import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields";
import { AccountContext } from "../../../../account/context/AccountContext.tsx";
import { IAddressForOrder } from "../../../../../api/types/IAddress.ts";

const DeliveryAddress = () => {
  const { address } = useContext(AccountContext);
  const { selectedDelivery } = useContext(OrderContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.delivery.address",
  });
  const { t: tErr } = useTranslation(undefined, {
    keyPrefix: "resolvers.address",
  });
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FormFields>();

  useEffect(() => {
    if (selectedDelivery?.icon === "inpost-paczkomat") {
      setValue("address", null);
    } else if (selectedDelivery?.icon.includes("courier") && address) {
      setValue("address", {
        country: address.country,
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
        homeNumber: address.homeNumber,
      } as IAddressForOrder);
    }
  }, [selectedDelivery, setValue]);

  return (
    <div className={"delivery-address mini-form"}>
      <h2 className="title">{t("title-where-to-deliver")}</h2>
      <div className="fields">
        <div className="field country">
          <label htmlFor={"address-country-id"}>{t("country-label")}</label>
          <div>
            <input
              type="text"
              id={"address-country-id"}
              className={errors.address?.country ? " red-outline" : ""}
              {...register("address.country")}
            />
          </div>
          <span className="error">
            {errors.address?.country?.message
              ? tErr(errors.address.country.message)
              : ""}
          </span>
        </div>
        <div className="field city">
          <label htmlFor={"address-city-id"}>{t("city-label")}</label>
          <div>
            <input
              type="text"
              id={"address-city-id"}
              className={errors.address?.city ? " red-outline" : ""}
              {...register("address.city")}
            />
          </div>
          <span className="error">
            {errors.address?.city?.message
              ? tErr(errors.address.city.message)
              : ""}
          </span>
        </div>
        <div className="field street">
          <label htmlFor={"address-street-id"}>{t("street-label")}</label>
          <div>
            <input
              type="text"
              id={"address-street-id"}
              className={errors.address?.street ? " red-outline" : ""}
              {...register("address.street")}
            />
          </div>
          <span className="error">
            {errors.address?.street?.message
              ? tErr(errors.address.street.message)
              : ""}
          </span>
        </div>
        <div className="field home-number">
          <label htmlFor={"address-home-number-id"}>
            {t("home-number-label")}
          </label>
          <div>
            <input
              type="number"
              min={0}
              id={"address-home-number-id"}
              className={errors.address?.homeNumber ? " red-outline" : ""}
              {...register("address.homeNumber", { valueAsNumber: true })}
            />
          </div>
          <span className="error">
            {errors.address?.homeNumber?.message
              ? tErr(errors.address.homeNumber.message)
              : ""}
          </span>
        </div>
        <div className="field postal-code">
          <label htmlFor={"address-postal-code-id"}>
            {t("postal-code-label")}
          </label>
          <div>
            <input
              type="text"
              id={"address-postal-code-id"}
              className={errors.address?.postalCode ? " red-outline" : ""}
              {...register("address.postalCode")}
            />
          </div>
          <span className="error">
            {errors.address?.postalCode?.message
              ? tErr(errors.address.postalCode.message)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
