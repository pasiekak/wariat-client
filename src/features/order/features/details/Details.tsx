import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";
import { FormFields } from "./types/FormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/schema";
import Button from "react-bootstrap/Button";
import DeliveryPick from "./components/DeliveryPick";
import InvoiceChoice from "./components/InvoiceChoice";
import CompanyData from "./components/CompanyData";
import ReceiverData from "./components/ReceiverData";
import DeliveryAddress from "./components/DeliveryAddress";
import { IAddressForOrder } from "../../../../api/types/IAddress";
import { AccountContext } from "../../../account/context/AccountContext";
import { ICompanyDataForOrder } from "../../../../api/types/ICompanyData";

import "./styles/styles";

const Details = () => {
  const { selectedDelivery, selectedParcel, wantInvoice } =
    useContext(OrderContext);
  const { companyData, address, user, personalData } =
    useContext(AccountContext);
  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      delivery: selectedDelivery ? selectedDelivery.icon : undefined,
      companyData: companyData ? (companyData as ICompanyDataForOrder) : null,
      receiverData: {
        firstname: personalData?.firstName
          ? personalData?.firstName
          : undefined,
        lastname: personalData?.lastName ? personalData?.lastName : undefined,
        phone: personalData?.phone ? personalData.phone : undefined,
        email: user?.email ? user.email : undefined,
      },
      address: address ? (address as IAddressForOrder) : null,
      parcel: selectedParcel ? selectedParcel.name : undefined,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!wantInvoice) {
      //ignore company data
    }
    console.log(data);
  };

  //Integration parcel from context with form
  useEffect(() => {
    if (selectedParcel) {
      methods.setValue("parcel", selectedParcel.name);
      methods.clearErrors("parcel");
    } else {
      methods.setValue("parcel", undefined);
    }
  }, [selectedParcel, methods]);

  return (
    <div className="details">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DeliveryPick />
          <InvoiceChoice />
          <ReceiverData />
          {wantInvoice && <CompanyData />}
          {selectedDelivery?.icon.includes("courier") && <DeliveryAddress />}
          <Button type="submit">Zatwierdź</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Details;
