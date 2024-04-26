import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types/FormFields.ts";

const StepTwoFields = (props: { loading: boolean }) => {
  const { t: tSchema } = useTranslation(undefined, {
    keyPrefix: "resolvers.personal-data",
  });
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <>
      <label htmlFor="firstname-id">{t("firstname-label")}*</label>
      <input
        type="text"
        id="firstname-id"
        disabled={props.loading}
        {...register("firstname")}
      />
      <span className="error">
        {errors.firstname?.message && tSchema(errors.firstname.message)}
      </span>

      <label htmlFor="lastname-id">{t("lastname-label")}*</label>
      <input
        type="text"
        id="lastname-id"
        disabled={props.loading}
        {...register("lastname")}
      />
      <span className="error">
        {errors.lastname?.message && tSchema(errors.lastname.message)}
      </span>

      <label htmlFor="phone-id">{t("phone-label")}*</label>
      <input
        type="text"
        id="phone-id"
        disabled={props.loading}
        {...register("phone")}
      />
      <span className="error">
        {errors?.phone?.type !== "api" &&
          errors?.phone?.message &&
          tSchema(errors.phone.message)}
        {errors?.phone?.type === "api" &&
          errors?.phone?.message &&
          t("api-messages." + errors.phone.message)}
      </span>

      <p>* - Pola opcjonalne</p>
    </>
  );
};

export default StepTwoFields;
