import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import AccountSettings from "../features/account-settings/AccountSettings";
import OrderSettings from "../features/order-settings/OrderSettings";

import "../styles/account-content.css";
import { AccountContext } from "../../../context/AccountContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive, faUserGear } from "@fortawesome/free-solid-svg-icons";

const AccountContent = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.account" });
  const { personalData, user } = useContext(AccountContext);
  const [index, setIndex] = useState(1);

  const generateName = () => {
    if (personalData?.firstName) {
      return personalData.firstName;
    } else if (user?.username) {
      return user.username;
    }
    return "";
  };

  return (
    <div className="account-content-wrapper">
      <div className="left">
        <h5>{t("welcome-message", { name: generateName() })}</h5>
        <div
          className="left-item"
          onClick={() => setIndex(1)}
          style={index === 1 ? { backgroundColor: "#0000001a" } : {}}
        >
          <FontAwesomeIcon icon={faFileLines} />
          <span className="left-item-text">{t("order-settings.title")}</span>
        </div>
        <div
          className="left-item"
          onClick={() => setIndex(2)}
          style={index === 2 ? { backgroundColor: "#0000001a" } : {}}
        >
          <FontAwesomeIcon icon={faUserGear} />
          <span className="left-item-text">{t("account-settings.title")}</span>
        </div>
        <div
          className="left-item"
          onClick={() => setIndex(3)}
          style={index === 3 ? { backgroundColor: "#0000001a" } : {}}
        >
          <FontAwesomeIcon icon={faBoxArchive} />
          <span className="left-item-text">{t("orders.title")}</span>
        </div>
      </div>
      <div className="line"></div>
      <div className="right">
        {index === 1 && <OrderSettings />}
        {index === 2 && <AccountSettings />}
      </div>
    </div>
  );
};

export default AccountContent;
