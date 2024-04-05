import { Outlet } from "react-router-dom";
import usePagination from "../pagination/hooks/usePagination";
import { useEffect, useState } from "react";
import { IProduct } from "../../api/types/IProduct";
import useAxiosGet from "../../api/hooks/useAxiosGet";
import useSearch from "./hooks/useSearch";
import useURL from "./hooks/useURL";
import useCategoryFilter from "./hooks/useCategoryFilter";
import useMarkFilter from "./hooks/useMarkFilter";
import usePriceFilter from "./hooks/usePriceFilter";
import useDisplay from "./hooks/useDisplay";

const ProductsOutletContext = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const pagination = usePagination();
  const search = useSearch();
  const categoryFilter = useCategoryFilter();
  const markFilter = useMarkFilter();
  const priceFilter = usePriceFilter();
  const display = useDisplay();
  const URL = useURL({
    page: pagination.page,
    orderBy: pagination.orderBy,
    orderDirection: pagination.orderDirection,
    itemsPerPage: pagination.itemsPerPage,
    searchWord: search.searchWord,
    entityPlural: "products",
    selectedCategories: categoryFilter.selectedCategories,
    selectedMarks: markFilter.selectedMarks,
    maxPrice: priceFilter.maxPrice,
    minPrice: priceFilter.minPrice,
  });
  const { data, loading } = useAxiosGet({ url: URL });
  useEffect(() => {
    if (data?.items?.count !== undefined && data?.items?.rows !== undefined) {
      pagination.changeCount(data.items.count);
      setProducts(data.items.rows);
    }
  }, [data?.items, pagination]);

  return (
    <Outlet
      context={{
        ...pagination,
        ...search,
        ...categoryFilter,
        ...markFilter,
        ...priceFilter,
        ...display,
        products,
        loading,
      }}
    />
  );
};

export default ProductsOutletContext;
