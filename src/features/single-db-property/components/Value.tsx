import { singleAttribute } from "../../../api/types/singleAttribute";

const Value = ({
  loading,
  value,
}: {
  loading: boolean;
  value: singleAttribute | undefined;
}) => {
  return (
    <span className="value">
      {loading ? "Ładowanie" : value ? value : "Brak"}
    </span>
  );
};

export default Value;
