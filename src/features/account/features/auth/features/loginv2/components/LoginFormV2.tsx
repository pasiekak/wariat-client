import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { formType } from "../types/form-type";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import { loginSchema } from "../schemas/login-schema";

import "../styles/form-basic-style.css";
import axios from "axios";
import { useContext, useState } from "react";
import { AccountContext } from "../../../../../context/AccountContext";
import { Spinner } from "react-bootstrap";
import { LoginFormProps } from "../types/LoginFormProps";

const LoginFormV2 = (props: LoginFormProps = {}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.login",
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
      .post("/auth/login", data)
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
          setError("password", { message: "server-error" });
        } else if (err?.response?.status === 401) {
          setError("password", { message: "wrong-login-pass" });
        } else {
          setError("password", { message: "not-known-error" });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`login-form`}>
      <h2>{t("title")}</h2>

      <label htmlFor="username-id">{t("username-label")}</label>
      <input
        autoFocus
        id="username-id"
        type="text"
        {...register("username")}
        disabled={loading}
      />
      <span className="error">
        {errors.username?.message
          ? t("schema." + errors.username.message)
          : " "}
      </span>

      <label htmlFor="password-id">{t("password-label")}</label>
      <input
        id="password-id"
        type="password"
        {...register("password")}
        disabled={loading}
      />
      <span className="error">
        {errors.password?.message
          ? t("schema." + errors.password.message)
          : " "}
      </span>

      <Button variant="dark" type="submit" disabled={loading}>
        {loading ? <Spinner size="sm" /> : t("button-submit")}
      </Button>
    </form>
  );
};

export default LoginFormV2;
