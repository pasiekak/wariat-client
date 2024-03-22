import useDiscountGroup from "../../../../../../../../../api/hooks/discounts/useDiscountGroup";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { IDiscountGroup } from "../../../../../../../../../api/types/IDiscountGroup";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../../../../../types/IOutletContext";

type UserDiscountGroupFormProps = {
  discountID: number;
  hideForm: () => void;
  userID: number;
  updateDiscountID: (id: number) => void;
  updateDiscountPercentage: (percentage: number) => void;
};

const UserDiscountGroupForm = (props: UserDiscountGroupFormProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();
  const { data } = useDiscountGroup();
  const [discountGroups, setDiscountGroups] = useState<null | IDiscountGroup[]>(
    null,
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: props.discountID,
    },
  });

  useEffect(() => {
    if (data?.discountGroups !== undefined) {
      setDiscountGroups(data.discountGroups);
    }
  }, [data]);

  const onSubmit = (data: any) => {
    if (discountGroups !== null) {
      const putData = { DiscountGroupId: parseInt(data.id) };
      const newDiscountGroup = discountGroups.find(
        (ob) => ob.id === putData.DiscountGroupId,
      );
      if (newDiscountGroup) {
        axios.put(`/api/users/${props.userID}`, putData).then((res) => {
          if (res.status === 200) {
            addBanner({
              message: "Zmodyfikowano grupę zniżkową użytkownika.",
              type: "success",
            });
            props.updateDiscountID(newDiscountGroup.id);
            props.updateDiscountPercentage(newDiscountGroup.percentage);
            props.hideForm();
          }
        });
      }
    }
  };

  if (discountGroups !== null) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button variant="dark" onClick={props.hideForm}>
          Wróć
        </Button>
        <select {...register("id")}>
          {discountGroups.map((group) => (
            <option
              value={group.id}
              key={group.id}
            >{`${group.id} - ${group.percentage} %`}</option>
          ))}
        </select>
        <Button variant="dark" type="submit">
          Zatwierdź
        </Button>
      </form>
    );
  }
  return null;
};
export default UserDiscountGroupForm;
