import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

import "./styles/edit-percentage-form.css";
import axios from "axios";
import { IDiscountGroup } from "../../../../../../../../api/types/IDiscountGroup";

type EditPercentageFormProps = {
  discountID: number;
  percentageBefore: number;
  limitBefore: number;
  updateGroupPercentage: (discountGroup: IDiscountGroup) => void;
  hideForm: () => void;
  previousGroup: IDiscountGroup | null;
  nextGroup: IDiscountGroup | null;
};

const EditPercentageForm = (props: EditPercentageFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: props.discountID,
      percentage: props.percentageBefore,
      limit: props.limitBefore,
    },
  });

  const onSubmit = (data: {
    id: number;
    percentage: number;
    limit: number;
  }) => {
    axios.put(`/api/discountGroups/${props.discountID}`, data).then((res) => {
      if (res.status === 200 && res.data[0] > 0) {
        props.updateGroupPercentage(data);
        props.hideForm();
      }
    });
  };

  return (
    <form className="edit-percentage-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        required
        disabled={props.discountID === 1}
        min={props.previousGroup ? props.previousGroup.percentage + 1 : 0}
        max={props.nextGroup ? props.nextGroup.percentage - 1 : 100}
        {...register("percentage", { valueAsNumber: true })}
      />
      <input
        type="number"
        required
        step={0.01}
        min={props.previousGroup ? props.previousGroup.limit + 1 : 1}
        max={props.nextGroup ? props.nextGroup.limit - 1 : 1000000}
        {...register("limit", { valueAsNumber: true })}
      />
      <Button type="submit" variant="dark">
        Zatwierdź
      </Button>
    </form>
  );
};

export default EditPercentageForm;
