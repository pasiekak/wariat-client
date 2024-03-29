import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Dropdown from "react-bootstrap/Dropdown";

import accountActions from "../../api/accountActions";
import { CartContext } from "../../features/order/features/cart/context/cart";
import { AccountContext } from "../../features/account/context/account";
import LanguageSelect from "./languageSelect/LanguageSelect";
import MobileHeader from "./mobileHeader";
import Logo from "../logo/Logo";

import "./header.css";

const Header = () => {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const { t } = useTranslation(null, { keyPrefix: "components.header" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { getCartCount } = useContext(CartContext);
  const { clearAccount } = useContext(AccountContext);
  const logout = async () => {
    clearAccount();
    removeCookie("user");
    await accountActions.logout();
    navigate("/");
  };

  return (
    <>
      {isMobile ? (
        <MobileHeader logout={logout} t={t} cookies={cookies} />
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
                {cookies.user ? (
                  ""
                ) : (
                  <Dropdown.Item onClick={() => navigate("/login")}>
                    {t("login")}
                  </Dropdown.Item>
                )}
                {cookies.user ? (
                  <Dropdown.Item onClick={() => navigate("/account")}>
                    {t("your-account")}
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                {cookies.user ? (
                  <Dropdown.Item onClick={logout}>{t("logout")}</Dropdown.Item>
                ) : (
                  ""
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/order">
              {t("cart")}({getCartCount()})
            </Link>
          </div>
          <LanguageSelect className={"topLang"} />
        </header>
      )}
    </>
  );
};

export default Header;
