import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import "./styles/products.css";
import SingleProduct from "./components/SingleProduct";
import Items from "../../types/items";
import Button from "react-bootstrap/Button";

interface OutletContext {
  tableName: string;
  setTableName: (tableName: string) => void;
  items: Items;
  loading: boolean;
}

const Products = () => {
  const { tableName, setTableName, items, loading }: OutletContext =
    useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTableName("products");
  }, []);

  return (
    <section className="products">
      <h1>Produkty( {items.count} )</h1>
      <div className="columns">
        <span title="Indywidualny identyfikator produktu.">ID</span>
        <span title="Nazwa produktu.">Nazwa</span>
        <span title="Ilość produktów dostępna do kupienia dla klientów.">
          Ilość
        </span>
        <span title="Cena Brutto">Cena Brutto</span>
        <span title="Czy produkt wyświetla się klientom?">Publikacja</span>
      </div>
      <div className="items">
        {items.rows.length > 0 &&
          items.rows.map((product, index) => (
            <SingleProduct
              id={product.id}
              name={product.name}
              maxQuantity={product.maxQuantity}
              priceBrutto={parseFloat(product.priceBrutto.toFixed(2))}
              published={product.published}
              key={index}
            />
          ))}
      </div>
      <div className="actions">
        <Button
          variant="dark"
          onClick={() => navigate("/dashboard/products/adding")}
        >
          Dodaj nowy produkt
        </Button>
      </div>
      {loading && <h2>Ładowanie</h2>}
      {!loading && items.rows.length === 0 && <h2>Brak produktów</h2>}
    </section>
  );
};

export default Products;
