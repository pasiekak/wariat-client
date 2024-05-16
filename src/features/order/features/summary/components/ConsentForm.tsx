import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { OrderContext } from "../../../context/OrderContext.tsx";
import { useNavigate } from "react-router-dom";

type FormFields = {
  consent1: boolean;
  consent2: boolean;
  consent3: boolean;
  agreeForAll: boolean;
  showComment: boolean;
  comment?: string;
};

const ConsentForm = () => {
  const { register, watch, handleSubmit, setValue } = useForm<FormFields>();
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.summary.form",
  });
  const { setFinalOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const consent1Watch = watch("consent1");
  const consent2Watch = watch("consent2");

  const agreeForAllWatch = watch("agreeForAll");
  const showCommentWatch = watch("showComment");

  // Effect to handle agree all input
  useEffect(() => {
    if (agreeForAllWatch) {
      setValue("consent1", true);
      setValue("consent2", true);
    }
  }, [agreeForAllWatch, setValue]);

  // Effect to handle agree all input depends on other consents
  useEffect(() => {
    if (consent1Watch && consent2Watch) {
      setValue("agreeForAll", true);
    } else {
      setValue("agreeForAll", false);
    }
  }, [consent1Watch, consent2Watch, setValue]);

  const onSubmit = (data: FormFields) => {
    setFinalOrder((prev) => {
      return {
        ...prev,
        comment: data.comment ? data.comment : null,
        consents: {
          rodo: true,
          terms: true,
        },
      };
    });
    navigate("/order/payment");
  };

  return (
    <form className="consent-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="consent-wrapper">
        <input
          type="checkbox"
          id="showCommentId"
          {...register("showComment")}
        />
        <label htmlFor="showCommentId">{t("comment-question")}</label>
      </div>
      <div className={`comment-wrapper${showCommentWatch ? " expanded" : ""}`}>
        <div className="inner">
          <textarea id="commentId" {...register("comment")} />
        </div>
      </div>
      <section className="consents">
        <div className="consent-wrapper">
          <input
            type="checkbox"
            id="consent1-id"
            {...register("consent1", { required: true })}
          />
          <label htmlFor="consent1-id">
            Zgoda RODO* (Tutaj chyba powinno być rodo jakieś nw)
          </label>
        </div>
        <div className="consent-wrapper">
          <input
            type="checkbox"
            id="consent2-id"
            {...register("consent2", { required: true })}
          />
          <label htmlFor="consent2-id">
            Zgoda REGULAMIN* (Regulamin na pewno musi być i musi być w formie
            linku który umożliwi przeczytanie\pobranie regulaminu)
          </label>
        </div>
        <div className="consent-wrapper">
          <input
            type="checkbox"
            disabled={consent1Watch && consent2Watch}
            id="agreeForAllId"
            {...register("agreeForAll")}
          />
          <label htmlFor="agreeForAllId">{t("agree-for-all")}</label>
        </div>
      </section>
      <Button
        type="submit"
        variant="success"
        disabled={!(consent1Watch && consent2Watch)}
      >
        {t("go-to-payment")} <FontAwesomeIcon icon={faCashRegister} />
      </Button>
      <p>{t("required-fields")}</p>
    </form>
  );
};

export default ConsentForm;
