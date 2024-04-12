import useDiscountGroup from "../../../../../../../../api/hooks/discounts/useDiscountGroup";
import { useEffect, useState } from "react";
import Label from "../../../../../../../single-db-property/components/Label";
import Value from "../../../../../../../single-db-property/components/Value";
import Button from "react-bootstrap/Button";
import UserDiscountGroupForm from "./components/UserDiscountGroupForm";

const DiscountGroup = ({ userID }: { userID: number }) => {
  const { data, loading } = useDiscountGroup({ userID });
  const [discountID, setDiscountID] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data?.discountGroup !== undefined) {
      setDiscountID(data.discountGroup.id);
      setPercentage(data.discountGroup.percentage);
    }
  }, [data?.discountGroup]);

  return (
    <div className="single-db-property discount-group">
      <Label labelText="Grupa zniżkowa" />
      {!showForm && (
        <Value
          loading={loading}
          value={
            discountID !== null && percentage !== null
              ? `${discountID} co daje zniżkę w wysokości ${percentage}%`
              : "Brak"
          }
        />
      )}
      {!showForm && (
        <Button variant="outline-dark" onClick={() => setShowForm(true)}>
          Edytuj
        </Button>
      )}
      {showForm && discountID !== null && (
        <UserDiscountGroupForm
          discountID={discountID}
          hideForm={() => setShowForm(false)}
          userID={userID}
          updateDiscountID={(id: number) => setDiscountID(id)}
          updateDiscountPercentage={(percentage: number) =>
            setPercentage(percentage)
          }
        />
      )}
    </div>
  );
};

export default DiscountGroup;
