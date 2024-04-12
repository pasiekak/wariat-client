import { useContext } from "react";

import { AccountContext } from "../../../../../../context/AccountContext";
import NipProperty from "./components/NipProperty";
import SingleDBProperty from "../../../../../../../single-db-property/SingleDBProperty";
import { useTranslation } from "react-i18next";

const CompanyProperties = () => {
  const { user, companyData, setCompanyData } = useContext(AccountContext);
  const { t } = useTranslation(undefined, {
    keyPrefix:
      "components.account.order-settings.delivery-or-company-properties",
  });

  const updateContextValueFN = (val: string | number, attribute: string) => {
    setCompanyData((prevState) => {
      if (prevState) return { ...prevState, [attribute]: val };
      return prevState;
    });
  };

  return (
    <div className="company-properties properties">
      {user && (
        <>
          <NipProperty />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=companyName`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              companyData?.companyName ? companyData.companyName : undefined
            }
            labelText={t("company-name")}
            modifiable={true}
            attributeName={"companyName"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=country`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              companyData?.country ? companyData.country : undefined
            }
            labelText={t("country")}
            modifiable={true}
            attributeName={"country"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=city`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={companyData?.city ? companyData.city : undefined}
            labelText={t("city")}
            modifiable={true}
            attributeName={"city"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=postalCode`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              companyData?.postalCode ? companyData.postalCode : undefined
            }
            labelText={t("postal-code")}
            modifiable={true}
            attributeName={"postalCode"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=street`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={companyData?.street ? companyData.street : undefined}
            labelText={t("street")}
            modifiable={true}
            attributeName={"street"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/companyData/users/${user.id}?attribute=buildingNumber`}
            putURL={`/api/companyData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              companyData?.buildingNumber
                ? companyData.buildingNumber
                : undefined
            }
            labelText={t("building-number")}
            modifiable={true}
            attributeName={"buildingNumber"}
            input={"text"}
          />
        </>
      )}
    </div>
  );
};

export default CompanyProperties;
