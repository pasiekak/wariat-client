import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./formLinks.css";

type FormLinksProps = {
  withRegister: boolean;
  withLogin: boolean;
  color?: string;
};

const FormLinks = ({ withRegister, withLogin, color }: FormLinksProps) => {
  const { t } = useTranslation("links", { keyPrefix: "forms.links" });

  return (
    <div className="FormLinks">
      {withRegister ? (
        <Link to="/register" style={{ color: color || "rgb(126, 129, 132)" }}>
          {t("noAccount")}
        </Link>
      ) : null}
      {withLogin ? (
        <Link to="/login" style={{ color: color || "rgb(126, 129, 132)" }}>
          {t("haveAccount")}
        </Link>
      ) : null}
      <Link to="/" style={{ color: color || "rgb(126, 129, 132)" }}>
        {t("goBack")}
      </Link>
    </div>
  );
};

export default FormLinks;
