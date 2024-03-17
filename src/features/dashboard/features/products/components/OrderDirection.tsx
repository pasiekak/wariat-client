import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutletContext } from "react-router-dom";
import { IProductsOutletContext } from "../../../types/IOutletContext";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const OrderDirection = ({ column }: { column: string }) => {
  const { order } = useOutletContext<IProductsOutletContext>();

  return (
    <FontAwesomeIcon
      icon={faCaretUp}
      className={`caret${order.direction === "DESC" ? " down" : " up"}${order.by === column ? " selected" : ""}`}
    />
  );
};

export default OrderDirection;
