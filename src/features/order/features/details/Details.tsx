import DeliveryPick from "./components/DeliveryPick";

import "./styles/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { FormFields } from "./types/FormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/schema";
import InvoiceChoice from "./components/InvoiceChoice";
import CompanyData from "./components/CompanyData";
import { AccountContext } from "../../../account/context/AccountContext";
import { ICompanyDataForOrder } from "../../../../api/types/ICompanyData";
import ReceiverData from "./components/ReceiverData";
import DeliveryAddress from "./components/DeliveryAddress";
import { IAddressForOrder } from "../../../../api/types/IAddress";

const Details = () => {
  const { selectedDelivery, wantInvoice } = useContext(OrderContext);
  const { companyData, address } = useContext(AccountContext);
  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      delivery: selectedDelivery ? selectedDelivery.id.toString() : undefined,
      companyData: companyData ? (companyData as ICompanyDataForOrder) : null,
      address: address ? (address as IAddressForOrder) : null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!wantInvoice) {
      //ignore company data
    }
    console.log(data);
  };

  return (
    <div className="details">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DeliveryPick />
          <InvoiceChoice />
          <ReceiverData />
          {wantInvoice && <CompanyData />}
          {selectedDelivery?.icon !== "in-person" && <DeliveryAddress />}
          <Button type="submit">Zatwierdź</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Details;
