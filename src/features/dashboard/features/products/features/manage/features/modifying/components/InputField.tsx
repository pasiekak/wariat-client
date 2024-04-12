import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { IProductDetails } from "../../../../../../../../../api/types/IProductDetails";
import { useTranslation } from "react-i18next";
import { uuid } from "../../../../../../../../../utils/uuid";

type InputFieldProps = {
  name:
    | "height"
    | "width"
    | "depth"
    | "weight"
    | "thickness"
    | "diameter"
    | "capacity"
    | "power"
    | "color"
    | "code"
    | "id"
    | "ProductId";
  register: UseFormRegister<IProductDetails>;
  disabled: boolean;
};

const numberNames = [
  "height",
  "width",
  "depth",
  "weight",
  "thickness",
  "diameter",
  "capacity",
  "power",
  "id",
  "ProductId",
];
const excludedNames = ["id", "ProductId"];
const stringNames = ["color", "code"];
const floatNames = ["capacity", "weight"];

const pickInputType = (name: string) => {
  if (numberNames.includes(name)) {
    return "number";
  } else if (stringNames.includes(name)) {
    return "text";
  }
};

const InputField = (props: InputFieldProps) => {
  const [inputType] = useState(pickInputType(props.name));
  const [uuID] = useState(uuid());
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.product.details",
  });

  if (inputType === "number" && !excludedNames.includes(props.name)) {
    return (
      <div className={`field`}>
        <label htmlFor={uuID}>{t(props.name)}</label>
        <input
          type={inputType}
          id={uuID}
          min={0}
          step={floatNames.includes(props.name) ? 0.01 : 1}
          disabled={props.disabled}
          {...props.register(props.name, { valueAsNumber: true })}
        />
      </div>
    );
  } else if (inputType === "text" && !excludedNames.includes(props.name)) {
    return (
      <div className={`field`}>
        <label htmlFor={uuID}>{t(props.name)}</label>
        <input
          type={inputType}
          id={uuID}
          disabled={props.disabled}
          {...props.register(props.name)}
        />
      </div>
    );
  }
  return null;
};

export default InputField;
