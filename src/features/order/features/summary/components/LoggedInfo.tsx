import { useTranslation } from "react-i18next";

const LoggedInfo = ({ asGuest }: { asGuest: boolean }) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.logged",
  });

  return (
    <div className="logged-info-wrapper">
      {asGuest ? (
        <>
          <h3>{t("not-logged-message")}</h3>
        </>
      ) : (
        <>
          <h3>{t("logged-message")}</h3>
        </>
      )}
      <ul>
        <li>
          <span className="pros_uno">{t("pros1_a")}</span>
          <span className="pros_dos">{t("pros1_b")}</span>
        </li>
        <li>
          <span className="pros_uno">{t("pros2_a")}</span>
          <span className="pros_dos">{t("pros2_b")}</span>
        </li>
        <li>
          <span className="pros_uno">{t("pros3_a")}</span>
          <span className="pros_dos">{t("pros3_b")}</span>
        </li>
        <li>
          <span className="pros_uno">{t("pros4_a")}</span>
          <span className="pros_dos">{t("pros4_b")}</span>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInfo;
