import { useContext } from "react";

import { AccountContext } from "../../../../../../context/account";
import PhoneNumberProperty from "./components/PhoneNumberProperty";
import FirstLastNameProperty from "./components/FirstLastNameProperty";

import "./styles/person-properties.css";

const PersonProperties = () => {
  const { personalData, updateAttributeValues } = useContext(AccountContext);

  return (
    <div className="person-properties properties">
      <FirstLastNameProperty
        firstName={personalData.firstName}
        lastName={personalData.lastName}
        updateContextFunction={updateAttributeValues}
      />
      <PhoneNumberProperty
        phone={personalData.phone}
        updateContextFunction={updateAttributeValues}
      />
    </div>
  );
};

export default PersonProperties;
