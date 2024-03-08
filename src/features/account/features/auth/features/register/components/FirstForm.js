import { useFormContext } from "react-hook-form";

import "../styles/nestedStyle.css";

const FirstForm = ({ register, t, tErr, formState: { errors } }) => {
  return (
    <div className="nestedForm">
      <label htmlFor="username">{t("username")}</label>
      <input id="username" type="text" {...register("username")} />
      <span>{errors.username ? tErr(errors.username.message) : null}</span>

      <label htmlFor="password">{t("password")}</label>
      <input id="password" type="password" {...register("password")} />
      <span>{errors.password ? tErr(errors.password.message) : null}</span>

      <label htmlFor="passwordRepeat">{t("passwordRepeat")}</label>
      <input
        id="passwordRepeat"
        type="password"
        {...register("passwordRepeat")}
      />
      <span>
        {errors.passwordRepeat ? tErr(errors.passwordRepeat.message) : null}
      </span>

      <label htmlFor="email">{t("email")}</label>
      <input id="email" type="email" {...register("email")} />
      <span>{errors.email ? tErr(errors.email.message) : null}</span>
    </div>
  );
};

export const NestedFirstForm = ({ children }) => {
  const methods = useFormContext();

  return <FirstForm {...methods} />;
};
