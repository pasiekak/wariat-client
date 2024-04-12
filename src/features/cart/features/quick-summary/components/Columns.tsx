import { useTranslation } from "react-i18next";

const Columns = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.cart.quick-summary",
  });
  return (
    <div className={"columns"}>
      <span></span>
      <span>{t("name")}</span>
      <span>{t("quantity")}</span>
      <span>{t("price")}</span>
    </div>
  );
};

export default Columns;
