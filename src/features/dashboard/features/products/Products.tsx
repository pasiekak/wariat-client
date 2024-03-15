import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/products.css";
import SingleProduct from "./components/SingleProduct";
import Items from "../../types/items";
import Button from "react-bootstrap/Button";
import Columns from "./components/Columns";
import axios from "axios";
import { ICategory } from "../attributes/types/ICategory";
import { IMark } from "../attributes/types/IMark";

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
  const [openedProduct, setOpenedProduct] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [marks, setMarks] = useState<IMark[]>([]);

  useEffect(() => {
    setTableName("products");
    axios.get("/api/categories").then((res) => {
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    });
    axios.get("/api/marks").then((res) => {
      if (res.status === 200) {
        setMarks(res.data.marks);
      }
    });
  }, []);

  const updateAttribute = (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => {
    if (attributeNameMany === "marks") {
      if (type === "add") {
        addMark(attribute);
      } else if (type === "delete") {
        removeMark(attribute);
      }
    } else if (attributeNameMany === "categories") {
      if (type === "add") {
        addCategory(attribute);
      } else if (type === "delete") {
        removeCategory(attribute);
      }
    }
  };
  const addCategory = (category: ICategory) => {
    setCategories((prev) => {
      return [...prev, category];
    });
  };

  const removeCategory = (category: ICategory) => {
    setCategories((prev) => {
      return prev.filter((cat) => cat !== category);
    });
  };
  const addMark = (mark: IMark) => {
    setMarks((prev) => {
      return [...prev, mark];
    });
  };

  const removeMark = (mark: IMark) => {
    setMarks((prev) => {
      return prev.filter((m) => m !== mark);
    });
  };

  return (
    <section className="products">
      <h1>Produkty( {items.count} )</h1>
      <Columns />
      <div className="items">
        {items.rows.length > 0 &&
          items.rows.map((product, index) => (
            <SingleProduct
              id={product.id}
              name={product.name}
              description={product.description}
              maxQuantity={product.maxQuantity}
              priceBrutto={parseFloat(product.priceBrutto.toFixed(2))}
              priceNetto={parseFloat(product.priceNetto.toFixed(2))}
              published={product.published}
              createdAt={new Date(product.createdAt)}
              updatedAt={new Date(product.updatedAt)}
              key={index}
              setOpen={setOpenedProduct}
              openedProduct={openedProduct}
              categories={categories}
              marks={marks}
              updateAttribute={updateAttribute}
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
