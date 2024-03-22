import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/products.css";
import Button from "react-bootstrap/Button";
import Columns from "./components/Columns";
import axios from "axios";
import { ICategory } from "../../../../api/types/ICategory";
import { IMark } from "../../../../api/types/IMark";
import { IProductsOutletContext } from "../../types/IOutletContext";
import ProductsList from "./components/ProductsList";
import { IProduct } from "./types/product";

const Products = () => {
  const { setTableName, items, loading, addBanner }: IProductsOutletContext =
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
  }, [setTableName]);

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
    addBanner({
      message: `Dodano kategorię: ${category.name}`,
      type: "success",
    });
  };

  const removeCategory = (category: ICategory) => {
    setCategories((prev) => {
      return prev.filter((cat) => cat !== category);
    });
    addBanner({
      message: `Usunięto kategorię: ${category.name}`,
      type: "info",
    });
  };
  const addMark = (mark: IMark) => {
    setMarks((prev) => {
      return [...prev, mark];
    });
    addBanner({ message: `Dodano markę: ${mark.name}`, type: "success" });
  };

  const removeMark = (mark: IMark) => {
    setMarks((prev) => {
      return prev.filter((m) => m !== mark);
    });
    addBanner({ message: `Usunięto markę: ${mark.name}`, type: "info" });
  };

  return (
    <section className="products">
      <Columns />
      {items.rows.length > 0 && (
        <ProductsList
          products={items.rows as IProduct[]}
          openedProduct={openedProduct}
          categories={categories}
          marks={marks}
          updateAttribute={updateAttribute}
          setOpen={setOpenedProduct}
        />
      )}
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
