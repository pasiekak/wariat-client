import { useTranslation } from "react-i18next";

const Description = (props: { description: string }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.product" });
  return (
    <section>
      <h2>{t("description-title")}</h2>
      <p className={`description`}>{props.description}</p>
    </section>
  );
};

export default Description;
