import { useTranslation } from "react-i18next";
import { IReceiverDataForOrder } from "../../../types/IFinalOrder.ts";

const ReceiverInfo = ({
  firstname,
  lastname,
  phone,
  email,
}: IReceiverDataForOrder) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.receiver",
  });

  return (
    <div className="receiver-info-wrapper">
      <h3>{t("title")}</h3>
      <p>
        {firstname} {lastname}
      </p>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
};
export default ReceiverInfo;
