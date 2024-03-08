import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("usernameRequired"),
  password: Yup.string().required("passwordRequired"),
});
