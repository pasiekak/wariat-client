import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields.ts";

const StepOneFields = (props: { loading: boolean }) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  const { t: tSchema } = useTranslation(undefined, {
    keyPrefix: "resolvers.account",
  });
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();
  return (
    <>
      <label htmlFor="username-id">{t("username-label")}</label>
      <input
        type="text"
        id="username-id"
        disabled={props.loading}
        {...register("username")}
      />
      <span className="error">
        {errors.username?.message && tSchema(errors.username.message)}
      </span>

      <label htmlFor="email-id">{t("email-label")}</label>
      <input
        type="email"
        id="email-id"
        disabled={props.loading}
        {...register("email")}
      />
      <span className="error">
        {errors.email?.message && tSchema(errors.email.message)}
      </span>

      <label htmlFor="password-id">{t("password-label")}</label>
      <input
        type="password"
        id="password-id"
        disabled={props.loading}
        {...register("password")}
      />
      <span className="error">
        {errors.password?.message && tSchema(errors.password.message)}
      </span>

      <label htmlFor="password-confirmation-id">
        {t("password-confirmation-label")}
      </label>
      <input
        type="password"
        id="password-confirmation-id"
        disabled={props.loading}
        {...register("passwordConfirmation")}
      />
      <span className="error">
        {errors?.passwordConfirmation?.type !== "api" &&
          errors?.passwordConfirmation?.message &&
          tSchema(errors.passwordConfirmation.message)}
        {errors?.passwordConfirmation?.type === "api" &&
          errors?.passwordConfirmation?.message &&
          t("api-messages." + errors.passwordConfirmation.message)}
      </span>
    </>
  );
};

export default StepOneFields;
