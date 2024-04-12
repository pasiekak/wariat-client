import { useContext } from "react";

import { AccountContext } from "../../../../../../context/AccountContext";
import SingleDBProperty from "../../../../../../../single-db-property/SingleDBProperty";
import { useTranslation } from "react-i18next";

const DeliveryProperties = () => {
  const { user, address, setAddress } = useContext(AccountContext);
  const { t } = useTranslation(undefined, {
    keyPrefix:
      "components.account.order-settings.delivery-or-company-properties",
  });

  const updateContextValueFN = (val: string | number, attribute: string) => {
    setAddress((prevState) => {
      if (prevState) return { ...prevState, [attribute]: val };
      return prevState;
    });
  };

  return (
    <div className="delivery-properties properties">
      {user && (
        <>
          <SingleDBProperty
            getURL={`/api/addresses/users/${user.id}?attribute=country`}
            putURL={`/api/addresses/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={address?.country ? address.country : undefined}
            labelText={t("country")}
            modifiable={true}
            attributeName={"country"}
            input={"text"}
          />

          <SingleDBProperty
            getURL={`/api/addresses/users/${user.id}?attribute=city`}
            putURL={`/api/addresses/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={address?.city ? address.city : undefined}
            labelText={t("city")}
            modifiable={true}
            attributeName={"city"}
            input={"text"}
          />

          <SingleDBProperty
            getURL={`/api/addresses/users/${user.id}?attribute=street`}
            putURL={`/api/addresses/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={address?.street ? address.street : undefined}
            labelText={t("street")}
            modifiable={true}
            attributeName={"street"}
            input={"text"}
          />

          <SingleDBProperty
            getURL={`/api/addresses/users/${user.id}?attribute=homeNumber`}
            putURL={`/api/addresses/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={address?.homeNumber ? address.homeNumber : undefined}
            labelText={t("home-number")}
            modifiable={true}
            attributeName={"homeNumber"}
            input={"number"}
          />

          <SingleDBProperty
            getURL={`/api/addresses/users/${user.id}?attribute=postalCode`}
            putURL={`/api/addresses/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={address?.postalCode ? address.postalCode : undefined}
            labelText={t("postal-code")}
            modifiable={true}
            attributeName={"postalCode"}
            input={"text"}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryProperties;
