import { IDelivery } from "../../../../../api/types/IDelivery";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../types/IOutletContext";

const Price = (props: IDelivery) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ price: number }>({
    defaultValues: {
      price: props.price,
    },
  });
  const { addBanner } = useOutletContext<IDefaultOutletContext>();

  const onSubmit: SubmitHandler<{ price: number }> = (data) => {
    setLoading(true);
    axios
      .put(`/api/delivery/${props.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          addBanner({ type: "success", message: "Zmieniono cenę za dostawę" });
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        disabled={loading || props.icon === "in-person"}
        type="number"
        min={0}
        step={0.01}
        required
        {...register("price", { valueAsNumber: true })}
      />
    </form>
  );
};

export default Price;
