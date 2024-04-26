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
    firstname: yup.string(),
    lastname: yup.string(),
    phone: yup
      .string()
      .matches(/^[0-9 ()+-]*$/, "phone-invalid")
      .max(15, "phone-max")
      .test("min", "phone-min", (phone) => !phone || phone.length >= 9),
  },
  account: {
    username: yup
      .string()
      .required("username-required")
      .max(50, "username-max"),
    password: yup
      .string()
      .required("password-required")
      .min(8, "password-min")
      .matches(/[0-9]/, "password-digits")
      .matches(/[a-z]/, "password-small-letter")
      .matches(/[A-Z]/, "password-big-letter")
      .matches(/[^\w]/, "password-special-sign"),
    passwordConfirmation: yup
      .string()
      .required("password-confirmation-required")
      .oneOf([yup.ref("password")], "password-confirmation-one-of"),
    email: yup.string().required("email-required").email("email-invalid"),
  },
};
