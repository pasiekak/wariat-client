import * as yup from "yup";
import { isNIPValid } from "../utils/nip";

export const allSchemas = {
  // Schemas for single attributes related to database
  address: {
    nip: yup
      .string()
      .required("nip-required")
      .matches(/^\d{10}$/, "nip-digits")
      .test("is-valid", "nip-invalid", (value) => isNIPValid(value)),
    companyName: yup
      .string()
      .required("company-name-required")
      .max(50, "company-name-max"),
    city: yup.string().required("city-required").max(50, "city-max"),
    street: yup.string().required("street-required").max(50, "street-max"),
    buildingNumber: yup
      .number()
      .typeError("building-number-required")
      .required("building-number-required")
      .min(0, "building-number-min"),
    homeNumber: yup
      .number()
      .typeError("home-number-required")
      .required("home-number-required")
      .min(0, "home-number-min"),
    postalCode: yup
      .string()
      .required("postal-code-required")
      .min(5, "postal-code-min")
      .max(10, "postal-code-max"),
    country: yup.string().required("country-required").max(30, "country-max"),
  },
  personalData: {
    firstname: yup.string().required("firstname-required"),
    lastname: yup.string().required("lastname-required"),
    phone: yup
      .string()
      .matches(/^[0-9 ()+-]+$/, "phone-invalid")
      .min(9, "phone-min")
      .max(15, "phone-max")
      .required("phone-required"),
  },
  account: {
    email: yup.string().required("email-required").email("email-invalid"),
  },
};
