import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../../features/cart/context/CartContext";
import Logo from "../logo/Logo";

import "./mobileHeader.css";
import { useTranslation } from "react-i18next";
import { AccountContext } from "../../features/account/context/AccountContext";

type MobileHeaderProps = {
  logout: () => void;
};

const MobileHeader = ({ logout }: MobileHeaderProps) => {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const { count } = useContext(CartContext);
  const { t } = useTranslation(undefined, { keyPrefix: "components.header" });

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="mobileHeader">
      <div
        className="leftMobile"
        onClick={() => setShowDropdown1(!showDropdown1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {showDropdown1 && (
          <div className="mobileDropdownList leftDropdown">
            <Link to="/">{t("mainPage")}</Link>
            <Link to="/products">{t("products")}</Link>
            <Link to="/events">{t("events")}</Link>
            {user ? "" : <Link to="/auth/login">{t("login")}</Link>}
            {user ? <Link to="/account">{t("your-account")}</Link> : ""}
            {user ? (
              <Link to="/">
                <span onClick={logout}>{t("logout")}</span>
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <Logo width={64} height={64} pathTo={"/"} />
      <div className="rightMobile" onClick={navigateToCart}>
        {count > 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
