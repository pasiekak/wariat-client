import "../styles/user-properties.css";
import AccountData from "./AccountData";
import PersonalData from "./PersonalData";
import CompanyData from "./CompanyData";
import AddressData from "./AddressData";

const UserProperties = () => {
  return (
    <div className="user-properties">
      <AccountData />
      <PersonalData />
      <CompanyData />
      <AddressData />
    </div>
  );
};

export default UserProperties;
