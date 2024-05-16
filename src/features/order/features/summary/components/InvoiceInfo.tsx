import { useTranslation } from "react-i18next";

type InvoiceInfoProps = {
  wantInvoice: boolean;
};

const InvoiceInfo = ({ wantInvoice }: InvoiceInfoProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.invoice",
  });

  return (
    <div className="invoice-info-wrapper">
      <h3>{t("title")}</h3>
      <p>{wantInvoice ? t("invoice") : t("receipt")}</p>
    </div>
  );
};

export default InvoiceInfo;
