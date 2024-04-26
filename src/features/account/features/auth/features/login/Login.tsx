import LoginForm from "./components/LoginForm.tsx";
import { useNavigate } from "react-router-dom";
import BannerPortal from "../../../../../message-banner/BannerPortal.tsx";
import { useRef } from "react";
import { IBannerPortalForwardedFunctions } from "../../../../../message-banner/types/IBannerPortalForwardedFunctions.ts";
import { useTranslation } from "react-i18next";

import "../../styles/auth-template.css";

const Login = () => {
  const navigate = useNavigate();
  const bannerRef = useRef<IBannerPortalForwardedFunctions>(null);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });

  const onSuccess = () => {
    if (bannerRef.current) {
      bannerRef.current.addBanner({
        type: "success",
        message: t("successful-login"),
      });
    }
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <>
      <LoginForm
        variant={"outline-light"}
        successFunction={onSuccess}
        withLinks={true}
      />
      <BannerPortal autoClose={true} autoCloseTime={5000} ref={bannerRef} />
    </>
  );
};

export default Login;
