import { useFormContext } from "react-hook-form";

const SecondForm = ({ register, t, tErr, formState: { errors } }) => {
  return (
    <div className="nestedForm">
      <label htmlFor="firstName">{t("firstName")}</label>
      <input type="text" {...register("firstName")} />
      <p>{errors.firstName ? tErr(errors.firstName.message) : null}</p>

      <label htmlFor="lastName">{t("lastName")}</label>
      <input type="text" {...register("lastName")} />
      <p>{errors.lastName ? tErr(errors.lastName.message) : null}</p>
    </div>
  );
};

export const NestedSecondForm = ({ children }) => {
  const methods = useFormContext();

  return <SecondForm {...methods} />;
};
