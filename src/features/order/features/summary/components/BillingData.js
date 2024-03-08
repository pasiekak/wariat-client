import { useTranslation } from "react-i18next";
import "../styles/billing-data.css";

const BillingData = ({ billing }) => {
  const {
    buildingNumber,
    city,
    companyName,
    country,
    nip,
    postalCode,
    street,
  } = billing;
  const { t } = useTranslation(null, {
    keyPrefix: "components.order.summary.billing-data",
  });
  return (
    <div className="billing-data">
      <span className="title">{t("title")}</span>
      <p>
        <span>{t("nip")}: </span>
        <span>{nip}</span>
      </p>
      <p>
        <span>{t("company-name")}: </span>
        <span>{companyName}</span>
      </p>
      <p>
        <span>{t("country")}: </span>
        <span>{country}</span>
      </p>
      <p>
        <span>{t("city")}: </span>
        <span>{city}</span>
      </p>
      <p>
        <span>{t("street")}: </span>
        <span>{street}</span>
      </p>
      <p>
        <span>{t("building-number")}: </span>
        <span>{buildingNumber}</span>
      </p>
      <p>
        <span>{t("postal-code")}: </span>
        <span>{postalCode}</span>
      </p>
    </div>
  );
};
export default BillingData;
