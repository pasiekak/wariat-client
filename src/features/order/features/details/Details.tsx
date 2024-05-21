import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { FormFields } from "./types/FormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/schema.ts";
import Button from "react-bootstrap/Button";
import DeliveryPick from "./components/DeliveryPick";
import InvoiceChoice from "./components/InvoiceChoice";
import CompanyData from "./components/CompanyData";
import ReceiverData from "./components/ReceiverData";
import DeliveryAddress from "./components/DeliveryAddress";
import { IAddressForOrder } from "../../../../api/types/IAddress";
import { AccountContext } from "../../../account/context/AccountContext";

import "./styles/styles";
import { useTranslation } from "react-i18next";
import { ICompanyDataForOrder } from "../../../../api/types/ICompanyData.ts";
import { IFinalOrder } from "../../types/IFinalOrder.ts";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../cart/context/CartContext.tsx";

const Details = () => {
  const {
    selectedDelivery,
    setFinalOrder,
    asGuest,
    selectedParcel,
    wantInvoice,
  } = useContext(OrderContext);
  const { companyData, address, user, personalData } =
    useContext(AccountContext);
  const { priceForAll, priceForAllWithoutDiscounts } = useContext(CartContext);
  const { t } = useTranslation(undefined, { keyPrefix: "components.order" });
  const navigate = useNavigate();

  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      delivery: selectedDelivery ? selectedDelivery.icon : undefined,
      companyData: companyData
        ? ({
            nip: companyData.nip,
            companyName: companyData.companyName,
            city: companyData.city,
            street: companyData.street,
            buildingNumber: companyData.buildingNumber,
            postalCode: companyData.postalCode,
            country: companyData.country,
          } as ICompanyDataForOrder)
        : null,
      receiverData: {
        firstname: personalData?.firstName
          ? personalData?.firstName
          : undefined,
        lastname: personalData?.lastName ? personalData?.lastName : undefined,
        phone: personalData?.phone ? personalData.phone : undefined,
        email: user?.email ? user.email : undefined,
      },
      address: address
        ? ({
            country: address.country,
            street: address.street,
            city: address.city,
            homeNumber: address.homeNumber,
            postalCode: address.postalCode,
          } as IAddressForOrder)
        : null,
      parcel:
        selectedDelivery?.icon === "inpost-parcel" && selectedParcel
          ? selectedParcel.name
          : null,
    },
    // @ts-expect-error Resolver has a problem with parcel when clause, but it works fine
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const finalOrder: IFinalOrder = {
      wantInvoice: !!data.companyData,
      asGuest: asGuest,
      companyData: data.companyData,
      address: data.address,
      receiverData: data.receiverData,
      delivery: data.delivery,
      parcel:
        data.parcel && selectedParcel?.address_details
          ? {
              code: data.parcel,
              building_number: selectedParcel.address_details.building_number,
              city: selectedParcel.address_details.city,
              flat_number: selectedParcel.address_details.flat_number,
              post_code: selectedParcel.address_details.post_code,
              province: selectedParcel.address_details.province,
              street: selectedParcel.address_details.street,
            }
          : null,
      comment: null,
      consents: {
        rodo: false,
        terms: false,
      },
      priceForAll:
        priceForAll + (selectedDelivery ? selectedDelivery.price : 0),
      priceForAllWithoutDiscounts:
        priceForAllWithoutDiscounts +
        (selectedDelivery ? selectedDelivery.price : 0),
    };
    setFinalOrder(finalOrder);
    navigate("/order/summary");
  };

  return (
    <div className="details">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DeliveryPick />
          <InvoiceChoice />
          <ReceiverData />
          {wantInvoice && <CompanyData />}
          {selectedDelivery?.icon.includes("courier") && <DeliveryAddress />}
          <Button type="submit">{t("go-to-order-summary")}</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Details;
