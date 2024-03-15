import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "../styles/attribute-add.css";
import { IAttributeAddProps } from "../types/IAttributeAddProps";

interface IForm {
  name: string;
}

const AttributeAdd = ({
  attributeNameMany,
  updateAttribute,
  setApiMessage,
}: IAttributeAddProps) => {
  const { register, handleSubmit } = useForm<IForm>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const onSubmit = (data: IForm) => {
    axios
      .post(`/api/${attributeNameMany}`, data)
      .then((res) => {
        if (res.status === 201) {
          setApiMessage(null);
          setShowForm(false);
          updateAttribute(res.data.attribute, attributeNameMany, "add");
        }
      })
      .catch((err) => {
        setApiMessage(`Wystąpił błąd. (${err.response.data.error})`);
      });
  };

  return (
    <div className="attribute add">
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="outline-success"
            onClick={() => {
              setApiMessage(null);
              setShowForm((prev) => !prev);
            }}
          >
            Anuluj
          </Button>
          <input
            type="text"
            {...register("name")}
            onChange={() => {
              setApiMessage(null);
            }}
          />
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
