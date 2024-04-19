import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFields } from "../types/FormFields";

const ReceiverData = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.receiver",
  });
  const { t: tErr } = useTranslation(undefined, {
    keyPrefix: "resolvers",
  });

  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <div className="receiver-data mini-form">
      <h2 className="title">{t("title")}</h2>
      <div className="fields">
        <div className="field firstname">
          <label htmlFor={"firstname-id"}>{t("firstname-label")}</label>
          <div>
            <input
              type="text"
              id={"firstname-id"}
              className={errors.receiverData?.firstname ? " red-outline" : ""}
              {...register("receiverData.firstname")}
            />
          </div>
          <span className="error">
            {errors.receiverData?.firstname?.message
              ? tErr("personal-data." + errors.receiverData.firstname.message)
              : ""}
          </span>
        </div>
        <div className="field lastname">
          <label htmlFor={"lastname-id"}>{t("lastname-label")}</label>
          <div>
            <input
              type="text"
              id={"lastname-id"}
              className={errors.receiverData?.lastname ? " red-outline" : ""}
              {...register("receiverData.lastname")}
            />
          </div>
          <span className="error">
            {errors.receiverData?.lastname?.message
              ? tErr("personal-data." + errors.receiverData.lastname.message)
              : ""}
          </span>
        </div>
        <div className="field phone">
          <label htmlFor={"phone-id"}>{t("phone-label")}</label>
          <div>
            <input
              type="text"
              id={"phone-id"}
              className={errors.receiverData?.phone ? " red-outline" : ""}
              {...register("receiverData.phone")}
            />
          </div>
          <span className="error">
            {errors.receiverData?.phone?.message
              ? tErr("personal-data." + errors.receiverData.phone.message)
              : ""}
          </span>
        </div>
        <div className="field email">
          <label htmlFor={"email-id"}>{t("email-label")}</label>
          <div>
            <input
              type="text"
              id={"email-id"}
              className={errors.receiverData?.email ? " red-outline" : ""}
              {...register("receiverData.email")}
            />
          </div>
          <span className="error">
            {errors.receiverData?.email?.message
              ? tErr("account." + errors.receiverData.email.message)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiverData;
