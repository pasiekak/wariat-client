import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Dropdown from "react-bootstrap/Dropdown";
import { CartContext } from "../../features/cart/context/CartContext";
import { AccountContext } from "../../features/account/context/AccountContext";
import MobileHeader from "./mobileHeader";
import Logo from "../logo/Logo";

import "./header.css";
import BannerPortal from "../../features/message-banner/BannerPortal.tsx";
import { IBannerPortalForwardedFunctions } from "../../features/message-banner/types/IBannerPortalForwardedFunctions.ts";

const Header = () => {
  const { count } = useContext(CartContext);
  const { isLogged, logout } = useContext(AccountContext);
  const { t } = useTranslation(undefined, { keyPrefix: "components.header" });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const bannerRef = useRef<IBannerPortalForwardedFunctions>(null);
  const onLogout = async () => {
    logout().then((success) => {
      if (bannerRef.current) {
        if (success) {
          bannerRef.current.addBanner({
            type: "info",
            message: t("logout-success"),
          });
        } else {
          bannerRef.current.addBanner({
            type: "warning",
            message: t("logout-error"),
          });
        }
      }
    });
  };

  return (
    <>
      {isMobile ? (
        <MobileHeader logout={onLogout} />
      ) : (
        <header className="Header">
          <div className="leftHeader">
            <Link to="/">{t("mainPage")}</Link>
            <Link to="/products">{t("products")}</Link>
            <Link to="/events">{t("events")}</Link>
          </div>
          <Logo width={125} height={125} pathTo={"/"} />
          <div className="rightHeader">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {t("account")}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {isLogged() ? (
                  <>
                    <Dropdown.Item onClick={() => navigate("/account")}>
                      {t("your-account")}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={onLogout}>
                      {t("logout")}
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => navigate("/auth/login")}>
                      {t("login")}
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/cart">
              {t("cart")}({count})
            </Link>
          </div>
        </header>
      )}
      <BannerPortal autoClose={true} autoCloseTime={5000} ref={bannerRef} />
    </>
  );
};

export default Header;
