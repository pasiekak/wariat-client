import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AccountContext } from "../../../../../../context/AccountContext";

import SingleDBProperty from "../../../../../../../single-db-property/SingleDBProperty";

const PersonProperties = () => {
  const { user, personalData, setPersonalData } = useContext(AccountContext);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.order-settings.person-properties",
  });

  const updateContextValueFN = (val: string | number, attribute: string) => {
    setPersonalData((prevState) => {
      if (prevState) return { ...prevState, [attribute]: val };
      return prevState;
    });
  };

  return (
    <div className="person-properties properties">
      {personalData && user && (
        <>
          <SingleDBProperty
            getURL={`/api/personalData/users/${user.id}?attribute=firstName`}
            putURL={`/api/personalData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              personalData?.firstName ? personalData.firstName : undefined
            }
            labelText={t("first-name")}
            modifiable={true}
            attributeName={"firstName"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/personalData/users/${user.id}?attribute=lastName`}
            putURL={`/api/personalData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={
              personalData?.lastName ? personalData.lastName : undefined
            }
            labelText={t("last-name")}
            modifiable={true}
            attributeName={"lastName"}
            input={"text"}
          />
          <SingleDBProperty
            getURL={`/api/personalData/users/${user.id}?attribute=phone`}
            putURL={`/api/personalData/users/${user.id}`}
            updateContextValueFN={updateContextValueFN}
            initialValue={personalData?.phone ? personalData.phone : undefined}
            labelText={t("phone-number")}
            modifiable={true}
            attributeName={"phone"}
            input={"text"}
          />
        </>
      )}
    </div>
  );
};

export default PersonProperties;
