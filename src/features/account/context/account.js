import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [cookies] = useCookies();
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null,
  );
  const [address, setAddress] = useState(
    JSON.parse(sessionStorage.getItem("address")) || null,
  );
  const [personalData, setPersonalData] = useState(
    JSON.parse(sessionStorage.getItem("personalData")) || null,
  );
  const [discountGroup, setDiscountGroup] = useState(
    JSON.parse(sessionStorage.getItem("discountGroup")) || null,
  );
  const [companyData, setCompanyData] = useState(
    JSON.parse(sessionStorage.getItem("companyData")) || null,
  );

  const setAccountData = (data) => {
    const { user, address, personalData, discountGroup, companyData } = data;
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    setAddress(address);
    sessionStorage.setItem("address", JSON.stringify(address));
    setPersonalData(personalData);
    sessionStorage.setItem("personalData", JSON.stringify(personalData));
    setDiscountGroup(discountGroup);
    sessionStorage.setItem("discountGroup", JSON.stringify(discountGroup));
    setCompanyData(companyData);
    sessionStorage.setItem("companyData", JSON.stringify(companyData));
  };
  const clearAccount = () => {
    setUser(null);
    setAddress(null);
    setPersonalData(null);
    setDiscountGroup(null);
    setCompanyData(null);
    sessionStorage.clear();
  };

  const updateAttributeValues = (attributeName, newValue) => {
    switch (attributeName) {
      case "user":
        setUser((prevUser) => ({ ...prevUser, ...newValue }));
        break;
      case "address":
        setAddress((prevAddress) => ({ ...prevAddress, ...newValue }));
        break;
      case "personalData":
        setPersonalData((prevPersonalData) => ({
          ...prevPersonalData,
          ...newValue,
        }));
        break;
      case "discountGroup":
        setDiscountGroup((prevDiscountGroup) => ({
          ...prevDiscountGroup,
          ...newValue,
        }));
        break;
      case "companyData":
        setCompanyData((prevCompanyData) => ({
          ...prevCompanyData,
          ...newValue,
        }));
        break;
      default:
        console.warn(`Unknown attribute name: ${attributeName}`);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        address,
        personalData,
        discountGroup,
        companyData,
        setAccountData,
        updateAttributeValues,
        setCompanyData,
        clearAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
