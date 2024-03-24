import useAxiosGet from "../../../../../../../../../api/hooks/useAxiosGet";
import { useEffect, useState } from "react";
import { RegisterOptions } from "react-hook-form";

import "../styles/field.css";
import { IProduct } from "../../../../../../products/types/product";

type ProductsSelectProps = {
  register: (name: "ProductId", registerOptions: RegisterOptions) => object;
  changeProductsEmpty: (count: number) => void;
};

const ProductsSelect = ({
  register,
  changeProductsEmpty,
}: ProductsSelectProps) => {
  const { data } = useAxiosGet({ url: "/api/products" });
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
      changeProductsEmpty(data.products.length);
    } else {
      changeProductsEmpty(0);
    }
  }, [data, changeProductsEmpty]);
  if (products) {
    return (
      <div className="field select-wrapper">
        <label>Wybierz produkt</label>
        {products.length > 0 ? (
          <select required {...register("ProductId", { valueAsNumber: true })}>
            {products.map((product) => (
              <option value={product.id} key={product.id}>
                ID produktu: {product.id} nazwa: {product.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="empty">
            Brak produktów, których mogła by dotyczyć zniżka.
          </span>
        )}
      </div>
    );
  }
  return null;
};

export default ProductsSelect;
