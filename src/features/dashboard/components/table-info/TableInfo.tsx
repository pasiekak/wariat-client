type TableInfoProps = {
  count: number;
  tableName: string;
};

const TableInfo = ({ count, tableName }: TableInfoProps) => {
  const renderTableName = (tableName: string) => {
    if (tableName === "users") {
      return "Użytkownicy";
    } else if (tableName === "products") {
      return "Produkty";
    }
  };

  return (
    <h1>
      {renderTableName(tableName)}({count})
    </h1>
  );
};

export default TableInfo;
