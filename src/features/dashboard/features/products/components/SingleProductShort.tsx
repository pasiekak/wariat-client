import Button from "react-bootstrap/Button";
import YesOrNo from "../../../../../components/YesOrNo/YesOrNo";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ISingleProductShort } from "../types/product";
import PublicationInput from "../features/manage/features/modifying/components/PublicationInput";

interface IOutletContext {
  fetchData: () => void;
}

const SingleProductShort = (props: ISingleProductShort) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const { fetchData }: IOutletContext = useOutletContext();
  const handleDelete = () => {
    axios
      .delete(`/api/products/${props.id}`)
      .then((res) => {
        if (res.data.success) {
          fetchData();
          alert(res.data.message);
        }
      })
      .finally(() => {
        setShowQuestion(false);
      });
  };

  return (
    <div className="single-product-short">
      <span className="id">{props.id}</span>
      <span>{props.name}</span>
      <span className="max-quantity">{props.maxQuantity}</span>
      <span>{props.priceBrutto} zł</span>
      <PublicationInput published={props.published} id={props.id} />
      <div className="actions">
        <Button
          variant={props.openedProduct === props.id ? "dark" : "outline-dark"}
          onClick={() =>
            props.setOpen((prev) => {
              if (prev === props.id) {
                return null;
              } else {
                return props.id;
              }
            })
          }
        >
          Więcej
        </Button>
        <Button variant="outline-dark" onClick={() => setShowQuestion(true)}>
          Usuń
        </Button>
      </div>
      {showQuestion && (
        <YesOrNo
          question={
            "Czy na pewno chcesz usunąć ten produkt? Spowoduje to usunięcie danych produktu oraz wszystkich powiązanych z nim zdjęć."
          }
          approveFn={handleDelete}
          declineFn={() => {
            setShowQuestion(false);
          }}
        />
      )}
    </div>
  );
};

export default SingleProductShort;
