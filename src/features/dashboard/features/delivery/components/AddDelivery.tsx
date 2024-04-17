import { SubmitHandler, useForm } from "react-hook-form";
import { IDelivery } from "../../../../../api/types/IDelivery";
import Button from "react-bootstrap/Button";
import { refactorEmptyStrings } from "../../../../../utils/refactorObject";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../types/IOutletContext";

type AddDeliveryProps = {
  addDelivery: (delivery: IDelivery) => void;
};

const AddDelivery = (props: AddDeliveryProps) => {
  const { register, handleSubmit, reset } = useForm<IDelivery>();
  const { addBanner } = useOutletContext<IDefaultOutletContext>();
  const onSubmit: SubmitHandler<IDelivery> = (data) => {
    const refactoredData = refactorEmptyStrings(data);
    axios.post(`/api/delivery`, refactoredData).then((res) => {
      if (res.status === 201) {
        console.log(res);
        addBanner({
          type: "success",
          message: `Dodano dostawę od dostawcy: ${refactoredData.company}`,
        });
        props.addDelivery(res.data);
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="solo add-delivery-form">
      <h2>Dodawanie rodzaju dostawy</h2>

      <div>
        <label htmlFor={"nameID"}>Nazwa dostawy</label>
        <input id="nameID" type="text" required {...register("name")} />
      </div>

      <div>
        <label htmlFor={"priceID"}>Opłata (zł)</label>
        <input
          id="priceID"
          type="number"
          required
          min={0}
          step={0.01}
          {...register("price", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor={"companyID"}>Nazwa dostawcy*</label>
        <input id="companyID" type="text" {...register("company")} />
      </div>

      <div>
        <label htmlFor={"descriptionID"}>Opis dostawy*</label>
        <textarea id="descriptionID" {...register("description")} />
      </div>

      <Button type="submit" variant="dark">
        Dodaj rodzaj dostawy
      </Button>
      <p>* - Pole opcjonalne</p>
    </form>
  );
};

export default AddDelivery;
