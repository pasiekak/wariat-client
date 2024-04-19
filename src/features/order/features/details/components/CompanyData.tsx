import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields";
import { useTranslation } from "react-i18next";

const CompanyData = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order",
  });
  const { t: tErr } = useTranslation(undefined, {
    keyPrefix: "resolvers.address",
  });

  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <div className="company-data mini-form">
      <h2 className="title">{t("invoice.company-data.title")}</h2>
      <p className="info">{t("invoice.company-data.info")}</p>
      <div className="fields">
        <div className="field nip">
          <label htmlFor={"nip-id"}>{t("delivery.address.nip-label")}</label>
          <div>
            <input
              type="text"
              id={"nip-id"}
              className={errors.companyData?.nip ? " red-outline" : ""}
              {...register("companyData.nip")}
            />
          </div>
          <span className="error">
            {errors.companyData?.nip?.message
              ? tErr(errors.companyData.nip.message)
              : ""}
          </span>
        </div>
        <div className="field company-name">
          <label htmlFor={"company-name-id"}>
            {t("delivery.address.company-name-label")}
          </label>
          <input
            type="text"
            id={"company-name-id"}
            className={errors.companyData?.companyName ? " red-outline" : ""}
            {...register("companyData.companyName")}
          />
          <span className="error">
            {errors.companyData?.companyName?.message
              ? tErr(errors.companyData.companyName.message)
              : ""}
          </span>
        </div>
        <div className="field city">
          <label htmlFor={"city-id"}>{t("delivery.address.city-label")}</label>
          <input
            type="text"
            id={"city-id"}
            className={errors.companyData?.city ? " red-outline" : ""}
            {...register("companyData.city")}
          />
          <span className="error">
            {errors.companyData?.city?.message
              ? tErr(errors.companyData.city.message)
              : ""}
          </span>
        </div>
        <div className="field street">
          <label htmlFor={"street-id"}>
            {t("delivery.address.street-label")}
          </label>
          <input
            type="text"
            id={"street-id"}
            className={errors.companyData?.street ? " red-outline" : ""}
            {...register("companyData.street")}
          />
          <span className="error">
            {errors.companyData?.street?.message
              ? tErr(errors.companyData.street.message)
              : ""}
          </span>
        </div>
        <div className="field building-number">
          <label htmlFor={"building-number-id"}>
            {t("delivery.address.building-number-label")}
          </label>
          <input
            type="number"
            id={"building-number-id"}
            min={0}
            className={errors.companyData?.buildingNumber ? " red-outline" : ""}
            {...register("companyData.buildingNumber", {
              valueAsNumber: true,
            })}
          />
          <span className="error">
            {errors.companyData?.buildingNumber?.message
              ? tErr(errors.companyData.buildingNumber.message)
              : ""}
          </span>
        </div>
        <div className="field postal-code">
          <label htmlFor={"postal-code-id"}>
            {t("delivery.address.postal-code-label")}
          </label>
          <input
            type="text"
            id={"postal-code-id"}
            className={errors.companyData?.postalCode ? " red-outline" : ""}
            {...register("companyData.postalCode")}
          />
          <span className="error">
            {errors.companyData?.postalCode?.message
              ? tErr(errors.companyData.postalCode.message)
              : ""}
          </span>
        </div>
        <div className="field country">
          <label htmlFor={"country-id"}>
            {t("delivery.address.country-label")}
          </label>
          <input
            type="text"
            id={"country-id"}
            className={errors.companyData?.country ? " red-outline" : ""}
            {...register("companyData.country")}
          />
          <span className="error">
            {errors.companyData?.country?.message
              ? tErr(errors.companyData.country.message)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyData;
