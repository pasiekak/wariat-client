import "./styles/modify.css";
import { ISingleProductExtended } from "../../../../types/product";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import {
  calculateBrutto,
  calculateNetto,
} from "../../../../../../../../utils/priceFunctions";
import IProductForm from "./types/productForm";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IBanner } from "../../../../../../../message-banner/types/IBanner";

interface IOutletContext {
  updateItem: (id: number, item: object) => void;
  addBanner: (banner: IBanner) => void;
}

const ProductModifyForm = (props: ISingleProductExtended) => {
  const { register, handleSubmit, setValue } = useForm<IProductForm>({
    defaultValues: {
      name: props.name,
      description: props.description,
      priceBrutto: props.priceBrutto,
      priceNetto: props.priceNetto,
      published: props.published,
      maxQuantity: props.maxQuantity,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { updateItem, addBanner } = useOutletContext<IOutletContext>();

  const handleBruttoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue("priceNetto", calculateNetto(parseFloat(e.target.value)));
  };

  const handleNettoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue("priceBrutto", calculateBrutto(parseFloat(e.target.value)));
  };
  const onSubmit = (data: IProductForm) => {
    setLoading(true);
    axios
      .put(`/api/products/${props.id}`, data)
      .then((res) => {
        if (res.status === 204) {
          addBanner({
            message: `Zmodyfikowano produkt.`,
            type: "success",
          });
          updateItem(props.id, data);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="modify">
      <h3>Dane produktu</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nazwa produktu</label>
        <input id="name" type="text" {...register("name")} />

        <label htmlFor="description">Opis</label>
        <textarea id="description" {...register("description")} />

        <label
          htmlFor="maxQuantity"
          title="Ilość produktów przeznaczona do sprzedaży. Minimalna wartość to 1."
        >
          Ilość
        </label>
        <input
          type="number"
          id="maxQuantity"
          min={0}
          {...register("maxQuantity", { required: true, valueAsNumber: true })}
        />

        <label
          htmlFor="priceBrutto"
          title="Cena produktu z uwzględnieniem VAT. Wpisz to pole, a cena netto obliczy się sama."
        >
          Cena Brutto
        </label>
        <input
          id="priceBrutto"
          type="number"
          min={0.01}
          step={0.01}
          {...register("priceBrutto", {
            required: true,
            valueAsNumber: true,
            onChange: handleBruttoChange,
          })}
        />

        <label
          htmlFor="priceNetto"
          title="Cena produktu nie uwzględniająca podatku VAT. Wpisz to pole, a cena brutto obliczy się sama."
        >
          Cena Netto
        </label>
        <input
          id="priceNetto"
          type="number"
          min={0.01}
          step={0.01}
          {...register("priceNetto", {
            required: true,
            valueAsNumber: true,
            onChange: handleNettoChange,
          })}
        />

        <label
          htmlFor="published"
          title="Zaznacz, jeśli chcesz żeby ten produkt został od rozu opublikowany."
        >
          Publikacja
        </label>
        <input id="published" type="checkbox" {...register("published")} />
        <Button type="submit" variant="dark" disabled={loading}>
          Zatwierdź zmiany
        </Button>
      </form>
    </section>
  );
};

export default ProductModifyForm;
