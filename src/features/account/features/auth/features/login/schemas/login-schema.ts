import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("username-required"),
  password: yup.string().required("password-required"),
});
