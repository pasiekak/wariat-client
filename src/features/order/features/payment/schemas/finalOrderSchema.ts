import * as yup from "yup";
import { allSchemas } from "../../../../../schemas/allSchemas.ts";
import { isNIPValid } from "../../../../../utils/nip.ts";

export const finalOrderSchema = yup.object({
  receiverData: yup.object({
    email: allSchemas.account.email,
    firstname: allSchemas.personalData.firstname.required("firstName-required"),
    lastname: allSchemas.personalData.lastname.required("lastName-required"),
    phone: allSchemas.personalData.phone,
  }),
  delivery: yup.string().required("delivery-required"),
  address: yup
    .object({
      city: allSchemas.address.city,
      country: allSchemas.address.country,
      homeNumber: allSchemas.address.homeNumber,
      postalCode: allSchemas.address.postalCode,
      street: allSchemas.address.street,
    })
    .when("delivery", ([delivery], schema) => {
      return delivery === "in-person" || delivery === "inpost-parcel"
        ? schema.nullable()
        : schema.required("address-required");
    }),
  parcel: yup
    .object({
      building_number: allSchemas.address.buildingNumber,
      city: allSchemas.address.city,
      code: yup.string().required("code-required"),
      post_code: allSchemas.address.postalCode,
      province: yup.string().required("province-required"),
      street: allSchemas.address.street,
    })
    .when("delivery", {
      is: "inpost-parcel",
      then: (schema) => schema.required("required"),
      otherwise: (schema) => schema.nullable(),
    }),
  consents: yup.object({
    rodo: yup.boolean().isTrue("rodo-true").required("rodo-required"),
    terms: yup.boolean().isTrue("terms-true").required("terms-required"),
  }),
  comment: yup.string().nullable(),
  wantInvoice: yup.boolean().required("want-invoice-required"),
  companyData: yup
    .object({
      buildingNumber: allSchemas.address.buildingNumber,
      city: allSchemas.address.city,
      companyName: allSchemas.address.companyName,
      country: allSchemas.address.country,
      nip: yup
        .string()
        .required("nip-required")
        .test((value) => isNIPValid(value)),
    })
    .when("wantInvoice", {
      is: true,
      then: (schema) => schema.required("company-data-required"),
      otherwise: (schema) => schema.nullable(),
    }),
});
