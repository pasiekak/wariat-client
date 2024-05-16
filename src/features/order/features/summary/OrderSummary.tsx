import "./styles/styles.ts";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext.tsx";
import DeliveryInfo from "./components/DeliveryInfo.tsx";
import ReceiverInfo from "./components/ReceiverInfo.tsx";
import InvoiceInfo from "./components/InvoiceInfo.tsx";
import CompanyInfo from "./components/CompanyInfo.tsx";
import QuickSummary from "../../../cart/features/quick-summary/QuickSummary.tsx";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import LoggedInfo from "./components/LoggedInfo.tsx";
import ConsentForm from "./components/ConsentForm.tsx";

const OrderSummary = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary",
  });
  const { finalOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  if (finalOrder) {
    return (
      <div className="order-summary">
        <Button
          variant="outline-dark"
          onClick={() => navigate("/order/details")}
        >
          {t("go-back")}
        </Button>
        <h1>{t("title")}</h1>
        <DeliveryInfo
          address={finalOrder.address}
          delivery={finalOrder.delivery}
          parcel={finalOrder.parcel}
        />
        {finalOrder.receiverData && (
          <ReceiverInfo {...finalOrder.receiverData} />
        )}
        <InvoiceInfo wantInvoice={finalOrder.wantInvoice} />
        <CompanyInfo companyData={finalOrder.companyData} />
        <QuickSummary type={"in-order"} withColumns={true} />
        <ConsentForm />
        <LoggedInfo asGuest={finalOrder.asGuest} />
      </div>
    );
  }
  return null;
};

export default OrderSummary;
