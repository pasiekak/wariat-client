import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/discounts-navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";

const DiscountsNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (location.pathname === "/dashboard/discounts") {
      setSelected(1);
    } else if (location.pathname === "/dashboard/discounts/groups") {
      setSelected(2);
    } else if (location.pathname === "/dashboard/discounts/individual") {
      setSelected(3);
    }
  }, [location.pathname]);

  return (
    <div className="discounts-navigation">
      <div
        className={`location${selected === 2 ? " selected" : ""}`}
        onClick={() => navigate("/dashboard/discounts/groups")}
      >
        <h1>Grupy zniżkowe</h1>
        <FontAwesomeIcon icon={faTags} />
      </div>
      <div
        className={`location${selected === 3 ? " selected" : ""}`}
        onClick={() => navigate("/dashboard/discounts/individual")}
      >
        <FontAwesomeIcon icon={faTag} />
        <h1>Nadawane zniżki</h1>
      </div>
    </div>
  );
};

export default DiscountsNavigation;
