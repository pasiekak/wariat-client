import * as yup from "yup";
import { allSchemas } from "../../../../../../../schemas/allSchemas.ts";

export const registerSchema = yup.object({
  username: allSchemas.account.username,
  password: allSchemas.account.password,
  passwordConfirmation: allSchemas.account.passwordConfirmation,
  email: allSchemas.account.email,

  firstname: allSchemas.personalData.firstname.optional(),
  lastname: allSchemas.personalData.lastname.optional(),
  phone: allSchemas.personalData.phone.optional(),
});
