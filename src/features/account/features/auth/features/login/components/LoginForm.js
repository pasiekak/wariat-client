import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import accountActions from "../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../context/account";
import { loginSchema } from "../schemas/loginSchema";

import "../styles/loginForm.css";

const LoginForm = () => {
  const [success, setSuccess] = useState(false);
  const [apiMsg, setApiMsg] = useState(null);
  const { t } = useTranslation("forms", { keyPrefix: "forms.login" });
  const { t: tErr } = useTranslation("schemas", { keyPrefix: "schemas.login" });
  const { t: tStatus } = useTranslation("status", {
    keyPrefix: "apiMessages.login",
  });
  const { setAccountData } = useContext(AccountContext);
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect");
  const navigate = useNavigate();
  const schema = loginSchema;

  const login = async (username, password) => {
    let apiResponse = await accountActions.login(username, password);
    setSuccess(apiResponse.success);
    setApiMsg(tStatus(apiResponse.message));
    if (apiResponse.success) {
      setAccountData(apiResponse.data);
    }
  };

  const handleOnChange = () => {
    setSuccess(false);
    setApiMsg(null);
  };

  useEffect(() => {
    if (success) {
      if (redirectPath) {
        navigate(`/${redirectPath}`);
      } else {
        navigate("/");
      }
    }
  }, [success, navigate, redirectPath]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values) => {
        await login(values.username, values.password);
        values.password = "";
      }}
    >
      <Form autoComplete="off" onChange={handleOnChange} className="LoginForm">
        <h1>{t("title")}</h1>
        <label htmlFor="username">{t("username")}</label>
        <Field id="username" name="username" type="text" />
        <div className="error">
          <ErrorMessage name="username" render={(msg) => tErr(msg)} />
        </div>
        <label htmlFor="password">{t("password")}</label>
        <Field id="password" name="password" type="password" />
        <div className="error">
          <ErrorMessage name="password" render={(msg) => tErr(msg)} />
          <p>{apiMsg}</p>
        </div>
        <button type="submit">{t("button")}</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
