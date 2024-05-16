import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields";
import { AccountContext } from "../../../../account/context/AccountContext.tsx";
import { ICompanyDataForOrder } from "../../../../../api/types/ICompanyData.ts";

const InvoiceChoice = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.invoice",
  });
  const { companyData } = useContext(AccountContext);
  const { wantInvoice, setWantInvoice } = useContext(OrderContext);
  const [selectedChoice, setSelectedChoice] = useState(wantInvoice);

  const { setValue } = useFormContext<FormFields>();

  useEffect(() => {
    setSelectedChoice(wantInvoice);
    if (!wantInvoice) {
      setValue("companyData", null);
    } else if (wantInvoice && companyData !== null) {
      setValue("companyData", {
        nip: companyData.nip,
        companyName: companyData.companyName,
        city: companyData.city,
        street: companyData.street,
        buildingNumber: companyData.buildingNumber,
        postalCode: companyData.postalCode,
        country: companyData.country,
      } as ICompanyDataForOrder);
    }
  }, [wantInvoice, setValue, companyData]);

  const handleRadioChange = (value: boolean) => {
    setSelectedChoice(value);
    setWantInvoice(value);
  };

  return (
    <div className="invoice-choice">
      <h2 className="title">{t("title")}</h2>
      <div className="choices">
        <div className={`choice${!selectedChoice ? " selected" : ""}`}>
          <input
            type="radio"
            id="wantInvoice-false"
            checked={!selectedChoice}
            onChange={() => handleRadioChange(false)}
          />
          <label htmlFor="wantInvoice-false">{t("label-for-false")}</label>
        </div>
        <div className={`choice${selectedChoice ? " selected" : ""}`}>
          <input
            type="radio"
            id="wantInvoice-true"
            checked={selectedChoice}
            onChange={() => handleRadioChange(true)}
          />
          <label htmlFor="wantInvoice-true">{t("label-for-true")}</label>
        </div>
      </div>
    </div>
  );
};

export default InvoiceChoice;
