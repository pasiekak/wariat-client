import Button from "react-bootstrap/Button";
import { IDiscountGroup } from "../../../../../../../../api/types/IDiscountGroup";
import { useForm } from "react-hook-form";

import "./styles/add-discount-group-form.css";
import { useEffect, useState } from "react";

type AddDiscountGroupFormProps = {
  lastDiscountGroup: IDiscountGroup;
  addGroup: (newGroup: IDiscountGroup) => Promise<boolean>;
};

const AddDiscountGroupForm = (props: AddDiscountGroupFormProps) => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      id: props.lastDiscountGroup.id + 1,
      percentage: props.lastDiscountGroup.percentage + 1,
      limit: props.lastDiscountGroup.limit + 5000,
    },
  });
  const [disabled, setDisabled] = useState(false);

  const minimumPercentage =
    props.lastDiscountGroup.percentage === 100
      ? 100
      : props.lastDiscountGroup.percentage + 1;
  const minimumLimit = props.lastDiscountGroup.limit + 1;

  const onSubmit = (data: IDiscountGroup) => {
    props.addGroup(data).then((success) => setDisabled(!success));
  };

  useEffect(() => {
    reset({
      id: props.lastDiscountGroup.id + 1,
      percentage: props.lastDiscountGroup.percentage + 1,
      limit: props.lastDiscountGroup.limit + 1000,
    });
  }, [props.lastDiscountGroup]);

  return (
    <form className="add-discount-group-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID </label>
        <input
          id="id"
          type="number"
          required
          disabled
          {...register("id", { valueAsNumber: true })}
        />
      </div>
      <div>
        <label htmlFor="percentage">Procent</label>
        <input
          id="percentage"
          type="number"
          required
          min={minimumPercentage}
          max={100}
          {...register("percentage", { valueAsNumber: true })}
        />
      </div>
      <div>
        <label
          htmlFor="limit"
          title={
            "Gdy suma zakupów użytkownika przekroczy tą wartość, zostanie mu przypisana kolejna grupa zniżkowa."
          }
        >
          Granica zniżki
        </label>
        <input
          id="limit"
          type="number"
          required
          step={0.01}
          min={minimumLimit}
          {...register("limit", { valueAsNumber: true })}
        />
      </div>
      <Button variant="dark" type="submit" disabled={disabled}>
        Dodaj
      </Button>
    </form>
  );
};

export default AddDiscountGroupForm;
