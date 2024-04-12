import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faImages,
  faPercent,
  faTruck,
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
  setUsePagination,
}: {
  setItems: (items: IProductsItems | IUsersItems) => void;
  loading: boolean;
  tableName: string | undefined;
  setUsePagination: (use: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    if (location.pathname.includes("products")) {
      setUsePagination(true);
      setSelected(1);
    } else if (location.pathname.includes("users")) {
      setUsePagination(true);
      setSelected(2);
    } else if (location.pathname.includes("discounts")) {
      setUsePagination(true);
      setSelected(3);
    } else if (location.pathname.includes("events")) {
      setUsePagination(false);
      setSelected(4);
    } else if (location.pathname.includes("delivery")) {
      setUsePagination(false);
      setSelected(5);
    }
  }, [location.pathname, setUsePagination]);

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
      <div
        onClick={() => handleClick("events")}
        className={selected === 4 ? "selected" : ""}
      >
        <FontAwesomeIcon icon={faImages} />
        <span>Wydarzenia</span>
      </div>
      <div
        onClick={() => handleClick("delivery")}
        className={selected === 5 ? "selected" : ""}
      >
        <FontAwesomeIcon icon={faTruck} />
        <span>Dostawa</span>
      </div>
    </section>
  );
};

export default NavigationPanel;
