import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { formType } from "../types/form-type.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/login-schema.ts";

import { AccountContext } from "../../../../../context/AccountContext.tsx";
import { Spinner } from "react-bootstrap";
import { LoginFormProps } from "../types/LoginFormProps.ts";
import axios from "axios";
import { useContext, useState } from "react";
import FormLinks from "../../../components/form-links/FormLinks.tsx";

import "../../../styles/auth-forms.css";

const LoginForm = (props: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  const { t: tSchema } = useTranslation(undefined, {
    keyPrefix: "resolvers.account",
  });
  const { setAccountData } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<formType> = (data) => {
    setLoading(true);
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        if (res.status === 200) {
          setAccountData(res.data.data);
          if (props?.successFunction) {
            props.successFunction();
          }
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          setError("password", { message: "server-error", type: "api" });
        } else if (err?.response?.status === 401) {
          setError("password", { message: "wrong-login-pass", type: "api" });
        } else {
          setError("password", { message: "not-known-error", type: "api" });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`login-form auth-form auth-outlet`}
    >
      <h2>{t("login-title")}</h2>

      <label htmlFor="username-id">{t("username-label")}</label>
      <input
        autoFocus
        id="username-id"
        type="text"
        {...register("username")}
        disabled={loading}
      />
      <span className="error">
        {errors.username?.message && tSchema(errors.username.message)}
      </span>

      <label htmlFor="password-id">{t("password-label")}</label>
      <input
        id="password-id"
        type="password"
        {...register("password")}
        disabled={loading}
      />
      <span className="error">
        {errors?.password?.type !== "api" &&
          errors?.password?.message &&
          tSchema(errors.password.message)}
        {errors?.password?.type === "api" &&
          errors?.password?.message &&
          t("api-messages." + errors.password.message)}
      </span>
      <div className="buttons">
        <Button variant={props.variant} type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : t("login-submit")}
        </Button>
      </div>
      {props.withLinks && <FormLinks withRegister={true} withLogin={false} />}
    </form>
  );
};

export default LoginForm;
