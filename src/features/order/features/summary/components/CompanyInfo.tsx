import { ICompanyDataForOrder } from "../../../../../api/types/ICompanyData.ts";
import { useTranslation } from "react-i18next";

const CompanyInfo = ({
  companyData,
}: {
  companyData: ICompanyDataForOrder | null;
}) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.company",
  });

  if (companyData) {
    return (
      <div className="company-info-wrapper">
        <h3>{t("title")}</h3>
        <p>{companyData.country}</p>
        <p>{companyData.companyName}</p>
        <p>{companyData.nip}</p>
        <p>
          {companyData.postalCode} {companyData.city}
        </p>
        <p>
          {companyData.street} {companyData.buildingNumber}
        </p>
      </div>
    );
  }
  return null;
};

export default CompanyInfo;
