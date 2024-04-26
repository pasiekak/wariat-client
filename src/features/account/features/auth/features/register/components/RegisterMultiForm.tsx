import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormFields } from "../types/FormFields.ts";
import { registerSchema } from "../schemas/schema.ts";
import { useTranslation } from "react-i18next";
import Buttons from "./Buttons.tsx";
import FormLinks from "../../../components/form-links/FormLinks.tsx";

import StepOneFields from "./StepOneFields.tsx";
import StepTwoFields from "./StepTwoFields.tsx";

import "../../../styles/auth-forms.css";
import axios from "axios";
import { refactorEmptyStrings } from "../../../../../../../utils/refactorObject.ts";
import { useNavigate } from "react-router-dom";

const RegisterMultiForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  const methods = useForm<FormFields>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    data = refactorEmptyStrings(data);
    let lang = localStorage.getItem("lang");
    if (lang) lang = lang.replace(/"/g, "");
    setLoading(true);
    axios
      .post("/api/auth/registerFirstStep", { ...data, lang })
      .then((res) => {
        if (res.status === 200) {
          navigate("/auth/email/waiting");
        } else {
          methods.setError("phone", {
            message: "not-known-error",
            type: "api",
          });
        }
      })
      .catch(() => {
        methods.setError("phone", {
          message: "server-error",
          type: "api",
        });
      })
      .finally(() => setLoading(false));
  };

  const stepOneVerification = () => {
    setLoading(true);
    methods
      .trigger(["username", "email", "password", "passwordConfirmation"])
      .then((success) => {
        if (success) {
          const body = {
            username: methods.getValues("username"),
            email: methods.getValues("email"),
          };
          axios
            .post("/api/auth/checkIfUserExists", body)
            .then((res) => {
              if (res.status === 200) {
                if (!res.data.exists) {
                  setStep(2);
                } else {
                  methods.setError("passwordConfirmation", {
                    message: "user-exists",
                    type: "api",
                  });
                }
              }
            })
            .catch(() => {
              methods.setError("passwordConfirmation", {
                message: "server-error",
                type: "api",
              });
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="register-form auth-form auth-outlet"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h2>{t("register-title")}</h2>
        {step === 1 && <StepOneFields loading={loading} />}
        {step === 2 && <StepTwoFields loading={loading} />}
        <Buttons
          loading={loading}
          step={step}
          setStep={setStep}
          stepOneVerification={stepOneVerification}
        />
        <FormLinks withRegister={false} withLogin={true} />
      </form>
    </FormProvider>
  );
};

export default RegisterMultiForm;
