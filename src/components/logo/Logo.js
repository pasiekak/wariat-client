import { Link } from "react-router-dom";
import logo from "../../assets/wariatLogo.png";
import logoPhone from "../../assets/wariatPhone.png";
import "./logo.css";

const Logo = ({ width, height, withPhone = false, pathTo }) => {
  const logoStyle = {
    width: width,
    height: height,
  };

  return (
    <div className="Logo">
      {pathTo ? (
        <Link to={pathTo}>
          <img
            src={withPhone ? logoPhone : logo}
            loading="blur"
            style={logoStyle}
            alt="Wariat logo"
          />
        </Link>
      ) : (
        <img
          src={withPhone ? logoPhone : logo}
          style={logoStyle}
          loading="blur"
          alt="Wariat logo"
        />
      )}
    </div>
  );
};

export default Logo;
