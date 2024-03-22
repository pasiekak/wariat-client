interface ICustomInputProps {
  type: string;
  register: (x: string) => object;
  attributeName: string;
}

const CustomInput = ({ type, register, attributeName }: ICustomInputProps) => {
  if (type === "text") {
    return <input type="text" required {...register(attributeName)} />;
  } else if (type === "number") {
    return <input type="number" required {...register(attributeName)} />;
  } else {
    return null;
  }
};

export default CustomInput;
