import * as yup from "yup";
import { allSchemas } from "../../../../../schemas/allSchemas";

export const schema = yup.object({
  delivery: yup.string().required(),
  companyData: yup
    .object({
      nip: allSchemas.address.nip,
      companyName: allSchemas.address.companyName,
      city: allSchemas.address.city,
      street: allSchemas.address.street,
      buildingNumber: allSchemas.address.buildingNumber,
      postalCode: allSchemas.address.postalCode,
      country: allSchemas.address.country,
    })
    .nullable(),
  receiverData: yup.object({
    firstname: allSchemas.personalData.firstname.required("firstname-required"),
    lastname: allSchemas.personalData.lastname.required("lastname-required"),
    phone: allSchemas.personalData.phone.required("phone-required"),
    email: allSchemas.account.email,
  }),
  address: yup
    .object({
      country: allSchemas.address.country,
      city: allSchemas.address.city,
      street: allSchemas.address.street,
      homeNumber: allSchemas.address.homeNumber,
      postalCode: allSchemas.address.postalCode,
    })
    .nullable(),
  parcel: yup.string().when("delivery", ([delivery], schema) => {
    if (delivery === "inpost-parcel") return schema.required("required");
    return schema.optional();
  }),
});
