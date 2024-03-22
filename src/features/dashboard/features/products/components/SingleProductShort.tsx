import Button from "react-bootstrap/Button";
import YesOrNo from "../../../../../components/yes-or-no/YesOrNo";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ISingleProductShort } from "../types/product";
import PublicationInput from "../features/manage/features/modifying/components/PublicationInput";
import { IBanner } from "../../../../message-banner/types/IBanner";

interface IOutletContext {
  fetchData: () => void;
  addBanner: (banner: IBanner) => void;
}

const SingleProductShort = (props: ISingleProductShort) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const { fetchData, addBanner }: IOutletContext = useOutletContext();
  const handleDelete = () => {
    axios
      .delete(`/api/products/${props.id}`)
      .then((res) => {
        if (res.data.success) {
          addBanner({
            message: `Usunięto produkt.`,
            type: "success",
          });
          fetchData();
        }
      })
      .finally(() => {
        setShowQuestion(false);
      });
  };

  return (
    <div className="single-product-short myrow">
      <span className="id">{props.id}</span>
      <span className="name">{props.name}</span>
      <span className="max-quantity">{props.maxQuantity}</span>
      <span className="price-brutto">{props.priceBrutto} zł</span>
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
