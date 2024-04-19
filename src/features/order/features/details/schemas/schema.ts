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
    firstname: allSchemas.personalData.firstname,
    lastname: allSchemas.personalData.lastname,
    phone: allSchemas.personalData.phone,
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
});
