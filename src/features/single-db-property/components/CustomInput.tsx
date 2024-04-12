import { RegisterOptions } from "react-hook-form";

interface ICustomInputProps {
  type: string;
  register: (x: string, options?: RegisterOptions) => object;
  attributeName: string;
}

const CustomInput = ({ type, register, attributeName }: ICustomInputProps) => {
  if (type === "text") {
    return (
      <input type="text" required autoFocus {...register(attributeName)} />
    );
  } else if (type === "number") {
    return (
      <input
        autoFocus
        type="number"
        required
        {...register(attributeName, { valueAsNumber: true })}
      />
    );
  } else {
    return null;
  }
};

export default CustomInput;
