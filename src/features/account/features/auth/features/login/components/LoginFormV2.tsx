import { useTranslation } from "react-i18next";

const LoginFormV2 = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.login",
  });

  return (
    <form>
      <h1>{t("title")}</h1>
    </form>
  );
};

export default LoginFormV2;
