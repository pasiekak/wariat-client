import { useNavigate } from "react-router-dom";
import logo from "../../assets/wariatLogo.png";
import logoPhone from "../../assets/wariatPhone.png";

type LogoProps = {
  width?: number;
  height?: number;
  withPhone?: boolean;
  pathTo?: string;
};

const Logo = ({ width, height, withPhone = false, pathTo }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathTo ? pathTo : "/");
  };

  return (
    <div
      className="logo"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        width: width ? `${width}px` : "200px",
        height: width ? `${height}px` : "200px",
        backgroundImage: `url(${withPhone ? logoPhone : logo})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Logo;
