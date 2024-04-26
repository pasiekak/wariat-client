import { useTranslation } from "react-i18next";

const EmailWaiting = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  return (
    <div className="email-waiting auth-outlet">
      <h2>{t("email-waiting-title")}</h2>
      <p>{t("email-waiting-message")}</p>
    </div>
  );
};

export default EmailWaiting;
