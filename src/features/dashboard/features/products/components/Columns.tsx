import OrderDirection from "./OrderDirection";
import { useOutletContext } from "react-router-dom";
import { IProductsOutletContext } from "../../../types/IOutletContext";

const Columns = () => {
  const { updateOrder, order, loading } =
    useOutletContext<IProductsOutletContext>();

  return (
    <div className="columns myrow">
      <div
        title="Indywidualny identyfikator produktu."
        className={`id`}
        onClick={() =>
          updateOrder("id", order.direction === "ASC" ? "DESC" : "ASC")
        }
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        <span>ID</span>
        <OrderDirection column="id" />
      </div>
      <div
        title="Nazwa produktu."
        className={`name`}
        onClick={() =>
          updateOrder("name", order.direction === "ASC" ? "DESC" : "ASC")
        }
      >
        <span>Nazwa</span>
        <OrderDirection column="name" />
      </div>
      <div
        title="Ilość produktów dostępna do kupienia dla klientów."
        className={`max-quantity`}
        onClick={() =>
          updateOrder("maxQuantity", order.direction === "ASC" ? "DESC" : "ASC")
        }
      >
        <span>Ilość</span>
        <OrderDirection column="maxQuantity" />
      </div>
      <div
        title="Cena Brutto"
        className={`price-brutto`}
        onClick={() =>
          updateOrder("priceBrutto", order.direction === "ASC" ? "DESC" : "ASC")
        }
      >
        <span>Brutto</span>
        <OrderDirection column="priceBrutto" />
      </div>
      <div
        title="Czy produkt wyświetla się klientom?"
        className={`publication`}
        onClick={() =>
          updateOrder("published", order.direction === "ASC" ? "DESC" : "ASC")
        }
      >
        <span>Publikacja</span>
        <OrderDirection column="published" />
      </div>
      <div className={"actions"} title="Dostępne operacje na produkcie.">
        <span>Akcje</span>
      </div>
    </div>
  );
};

export default Columns;
