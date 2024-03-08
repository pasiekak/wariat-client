import { useContext } from "react";

import accountActions from "../../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../../context/account";
import SimpleProperty from "../../../../components/simple-property/SimpleProperty";
import NipProperty from "./components/NipProperty";

const CompanyProperties = () => {
  const { companyData, setCompanyData, updateAttributeValues } =
    useContext(AccountContext);

  const uploadNIPdata = async (nip) => {
    let response = await accountActions.companyData.getDataByNIP(nip);
    if (response.success) {
      let updateBody = {
        nip: response.data.companyNip,
        companyName: response.data.companyName,
        city: response.data.companyCity,
        street: response.data.companyStreet,
        postalCode: response.data.companyPostalCode,
        country: response.data.companyCountry,
        buildingNumber: response.data.companyBuildingNumber,
      };
      let response2 = await accountActions.companyData.updateAll(updateBody);
      if (response2.data.success) {
        setCompanyData(updateBody);
      }
      return response;
    } else {
      return response;
    }
  };

  return (
    <div className="company-properties properties">
      {companyData && (
        <>
          <NipProperty
            nipOriginal={companyData.nip}
            uploadNIPdata={uploadNIPdata}
            updateContextFunction={updateAttributeValues}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.company-name"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.company-name-placeholder"
            }
            attrName={"companyName"}
            attrValue={companyData.companyName}
            updateFunction={accountActions.companyData.updateCompanyName}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.country"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.country-placeholder"
            }
            attrName={"country"}
            attrValue={companyData.country}
            updateFunction={accountActions.companyData.updateCountry}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.city"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.city-placeholder"
            }
            attrName={"city"}
            attrValue={companyData.city}
            updateFunction={accountActions.companyData.updateCity}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.postal-code"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.postal-code-placeholder"
            }
            attrName={"postalCode"}
            attrValue={companyData.postalCode}
            updateFunction={accountActions.companyData.updatePostalCode}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.street"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.street-placeholder"
            }
            attrName={"street"}
            attrValue={companyData.street}
            updateFunction={accountActions.companyData.updateStreet}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
          <SimpleProperty
            inputType="text"
            titleTranslation="order-settings.delivery-or-company-properties.building-number"
            placeholderTranslation={
              "order-settings.delivery-or-company-properties.building-number-placeholder"
            }
            attrName={"buildingNumber"}
            attrValue={companyData.buildingNumber}
            updateFunction={accountActions.companyData.updateBuildingNumber}
            updateContextFunction={updateAttributeValues}
            contextAttrName={"companyData"}
          />
        </>
      )}
    </div>
  );
};

export default CompanyProperties;
