import { IDiscountGroup } from "../../../../../../../api/types/IDiscountGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import EditPercentageForm from "../features/edit/EditPercentageForm";

type SingleDiscountGroupProps = {
  group: IDiscountGroup;
  updateGroupPercentage: (discountGroup: IDiscountGroup) => void;
  deleteGroup: (discountGroupID: number) => void;
  previousGroup: IDiscountGroup | null;
  nextGroup: IDiscountGroup | null;
};

const SingleDiscountGroup = (props: SingleDiscountGroupProps) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="single-discount-group">
      <div>
        <span className="id">#{props.group.id}</span>
      </div>
      {showForm ? (
        <EditPercentageForm
          percentageBefore={props.group.percentage}
          limitBefore={props.group.limit}
          discountID={props.group.id}
          previousGroup={props.previousGroup}
          nextGroup={props.nextGroup}
          updateGroupPercentage={props.updateGroupPercentage}
          hideForm={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="percentage">
            <span>{props.group.percentage}%</span>
          </div>
          <div className="limit">
            <span>{props.group.limit} zł</span>
          </div>
        </>
      )}

      <div className="actions">
        <Button variant="dark" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Wróć" : "Edytuj"}
        </Button>
        <Button
          variant="dark"
          onClick={() => props.deleteGroup(props.group.id)}
          disabled={props.nextGroup !== null || props.group.id === 1}
        >
          Usuń
        </Button>
      </div>
    </div>
  );
};

export default SingleDiscountGroup;
