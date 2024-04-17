import * as yup from "yup";

export const schema = yup.object().shape({
  selected: yup.string().required("required"),
});
