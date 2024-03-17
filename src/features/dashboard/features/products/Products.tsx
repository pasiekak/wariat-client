import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/products.css";
import Button from "react-bootstrap/Button";
import Columns from "./components/Columns";
import axios from "axios";
import { ICategory } from "../attributes/types/ICategory";
import { IMark } from "../attributes/types/IMark";
import { IProductsOutletContext } from "../../types/IOutletContext";
import ProductsList from "./components/ProductsList";
import { IProduct } from "./types/product";
import TableInfo from "../../components/table-info/TableInfo";

const Products = () => {
  const { setTableName, tableName, items, loading }: IProductsOutletContext =
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
      <TableInfo tableName={tableName} count={items.count} />
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
