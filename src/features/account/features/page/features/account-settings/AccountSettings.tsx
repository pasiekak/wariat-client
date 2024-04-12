import { useTranslation } from "react-i18next";

import "./account-settings.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../../../context/AccountContext";

const AccountSettings = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.account-settings",
  });

  const { user, isModerator } = useContext(AccountContext);

  return (
    <div className="account-settings">
      <h5>{t("title")}</h5>
      <div className="single-db-property">
        <span className={`label`}>{t("login")}</span>
        <span className={`value`}>{user?.username}</span>
      </div>
      <div className="single-db-property">
        <span className={`label`}>{t("email")}</span>
        <span className={`value`}>{user?.email}</span>
      </div>
      {isModerator() && (
        <div className="single-db-property">
          <span className={`label`}>{t("dashboard-place")}</span>
          <Link to={"/dashboard"}>
            <Button variant="outline-success">{t("dashboard-button")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
