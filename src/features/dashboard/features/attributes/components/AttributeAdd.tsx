import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "../styles/attribute-add.css";
import { IAttributeAddProps } from "../types/IAttributeAddProps";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../types/IOutletContext";

interface IForm {
  name: string;
}

const AttributeAdd = ({
  attributeNameMany,
  updateAttribute,
}: IAttributeAddProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const onSubmit = (data: IForm) => {
    axios
      .post(`/api/${attributeNameMany}`, data)
      .then((res) => {
        if (res.status === 201) {
          setShowForm(false);
          updateAttribute(res.data.attribute, attributeNameMany, "add");
          reset();
        }
      })
      .catch((err) => {
        if (err?.response?.data?.error)
          addBanner({ message: err.response.data.error, type: "error" });
      });
  };

  return (
    <div className="attribute add">
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="outline-success"
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            Anuluj
          </Button>
          <input type="text" {...register("name")} />
          <Button variant="outline-success" type="submit">
            Dodaj
          </Button>
        </form>
      ) : (
        <span onClick={() => setShowForm((prev) => !prev)}>Dodaj</span>
      )}
    </div>
  );
};
export default AttributeAdd;
