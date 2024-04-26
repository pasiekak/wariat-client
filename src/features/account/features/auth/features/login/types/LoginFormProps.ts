import { ButtonVariant } from "react-bootstrap/types";

export type LoginFormProps = {
  successFunction?: () => void;
  withLinks?: boolean;
  variant: ButtonVariant;
};
