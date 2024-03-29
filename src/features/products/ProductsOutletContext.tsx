import { Outlet } from "react-router-dom";
import usePagination from "../pagination/hooks/usePagination";
import { useEffect, useState } from "react";
import { IProduct } from "../../api/types/IProduct";
import useAxiosGet from "../../api/hooks/useAxiosGet";

const ProductsOutletContext = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const pagination = usePagination({ entityPlural: "products" });
  const { data, loading } = useAxiosGet({ url: pagination.URL });

  useEffect(() => {
    if (data?.items) {
      pagination.changeCount(data.items.count);
      setProducts(data.items.rows);
    }
  }, [data?.items]);

  return <Outlet context={{ ...pagination, products, loading }} />;
};

export default ProductsOutletContext;
