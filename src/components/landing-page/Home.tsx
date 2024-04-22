import React from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import Logo from "../logo/Logo";

import "./styles/home.css";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { t } = useTranslation(undefined, { keyPrefix: "components.home" });
  return (
    <div className="Home bck-smooth">
      {!isMobile && <Logo width={400} height={400} withPhone={true} />}
      <div className="page-description">
        <span>{t("welcomeMessage")}</span>
      </div>
    </div>
  );
};

export default Home;
