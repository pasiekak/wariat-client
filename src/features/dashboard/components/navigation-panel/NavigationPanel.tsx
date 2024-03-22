import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faPercent,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/navigation-panel.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProductsItems, IUsersItems } from "../../types/items";

const NavigationPanel = ({
  setItems,
  loading,
  tableName,
}: {
  setItems: (items: IProductsItems | IUsersItems) => void;
  loading: boolean;
  tableName: string | undefined;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    if (location.pathname.includes("products")) {
      setSelected(1);
    } else if (location.pathname.includes("users")) {
      setSelected(2);
    } else if (location.pathname.includes("discounts")) {
      setSelected(3);
    }
  }, [location.pathname]);

  const handleClick = (to: string) => {
    if (
      (!loading || tableName === undefined) &&
      !location.pathname.includes(to)
    ) {
      setItems({ count: 0, rows: [] });
      navigate(`/dashboard/${to}`);
    }
  };

  return (
    <section className="navigation-panel">
      <div
        onClick={() => handleClick("products")}
        className={selected === 1 ? "selected" : ""}
      >
        <FontAwesomeIcon icon={faBoxesStacked} />
        <span>Produkty</span>
      </div>
      <div
        onClick={() => handleClick("users")}
        className={selected === 2 ? "selected" : ""}
      >
        <FontAwesomeIcon icon={faUsers} />
        <span>Użytkownicy</span>
      </div>
      <div className={selected === 3 ? "selected" : ""}>
        <FontAwesomeIcon
          icon={faPercent}
          onClick={() => handleClick("discounts")}
        />
        <div className="nested">
          <span onClick={() => handleClick("discounts/groups")}>
            Grupy zniżkowe
          </span>
          <span onClick={() => handleClick("discounts/individual")}>
            Nadawane zniżki
          </span>
        </div>
      </div>
    </section>
  );
};

export default NavigationPanel;
