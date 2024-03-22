import "../../styles/table-info.css";
import { useLocation } from "react-router-dom";

type TableInfoProps = {
  count: number;
  tableName: string;
};

const renderLocations = ["/dashboard/products", "/dashboard/users"];

const TableInfo = ({ count, tableName }: TableInfoProps) => {
  const location = useLocation();
  const renderTableName = (tableName: string) => {
    if (tableName === "users") {
      return "Użytkownicy";
    } else if (tableName === "products") {
      return "Produkty";
    }
  };
  const checkIfLocationIsValid = () => {
    return renderLocations.includes(location.pathname);
  };
  if (checkIfLocationIsValid()) {
    return (
      <h1 className="table-info">
        {renderTableName(tableName)}({count})
      </h1>
    );
  }
  return null;
};

export default TableInfo;
