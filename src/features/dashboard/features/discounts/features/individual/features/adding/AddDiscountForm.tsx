import { useEffect, useState } from "react";
import useInputs from "./hooks/useInputs";
import UsersSelect from "./components/UsersSelect";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import CategoriesSelect from "./components/CategoriesSelect";
import useDisabled from "./hooks/useDisabled";
import ProductsSelect from "./components/ProductsSelect";
import { getNowDateToInputString } from "../../../../../../../../utils/dateFunctions";
import axios from "axios";
import { IDiscount } from "../../../../../../../../api/types/IDiscount";

import "./styles/add-discount-form.css";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../../../../types/IOutletContext";

type defaultFormValues = {
  expires: string;
  percentage: number;
  UserId: number | null;
  CategoryId: number | null;
  ProductId: number | null;
};

type AddDiscountFormProps = {
  type: string;
  addDiscount: (discount: IDiscount) => void;
};
const generateDefaultValues = () => {
  return {
    expires: getNowDateToInputString(),
    percentage: 1,
    UserId: null,
    CategoryId: null,
    ProductId: null,
  };
};

const AddDiscountForm = (props: AddDiscountFormProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();
  const [defaultValues, setDefaultValues] = useState<defaultFormValues>(
    generateDefaultValues(),
  );
  const [loading, setLoading] = useState(false);

  const { useUsersInput, useCategoriesInput, useProductsInput } = useInputs({
    type: props.type,
  });
  const {
    disabled,
    changeUsersEmpty,
    changeCategoriesEmpty,
    changeProductsEmpty,
  } = useDisabled({ type: props.type });

  const { register, reset, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(generateDefaultValues());
  }, [useUsersInput, useCategoriesInput, useProductsInput]);

  const onSubmit = (data: defaultFormValues) => {
    setLoading(true);
    axios
      .post("/api/discounts", data)
      .then((res) => {
        if (res.status === 201) {
          addBanner({ message: res.data.message, type: "success" });
          props.addDiscount(res.data.discount);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          addBanner({ message: err.response.data.message, type: "error" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      className="add-discount-form discounts-content"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Formularz dodawania zniżki</h1>
      {useUsersInput && (
        <UsersSelect register={register} changeUsersEmpty={changeUsersEmpty} />
      )}
      {useCategoriesInput && (
        <CategoriesSelect
          register={register}
          changeCategoriesEmpty={changeCategoriesEmpty}
        />
      )}
      {useProductsInput && (
        <ProductsSelect
          register={register}
          changeProductsEmpty={changeProductsEmpty}
        />
      )}
      <div className="field">
        <label htmlFor="percentage">Procent zniżki</label>
        <input
          id="percentage"
          type="number"
          min={1}
          max={100}
          required
          {...register("percentage", { valueAsNumber: true })}
        />
      </div>
      <div className="field">
        <label htmlFor="expires">Data wygaśnięcia zniżki</label>
        <input
          id="expires"
          type="datetime-local"
          min={getNowDateToInputString()}
          required
          {...register("expires", { valueAsDate: true })}
        />
      </div>
      <Button variant="dark" type="submit" disabled={disabled || loading}>
        Dodaj zniżkę
      </Button>
    </form>
  );
};

export default AddDiscountForm;
