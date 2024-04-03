import { useEffect, useState } from "react";
import { ICategory } from "../../../api/types/ICategory";
import useCategory from "../../../api/hooks/category/useCategory";
import { useCategoryFilterReturns } from "../types/useCategoryFilterReturns";

const useCategoryFilter = (): useCategoryFilterReturns => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

  const { data } = useCategory();

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data?.categories]);

  const addCategoryFilter = (category: ICategory) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  const removeCategoryFilter = (category: ICategory) => {
    setSelectedCategories((prev) => prev.filter((c) => c.id !== category.id));
  };

  const clearCategoryFilters = () => {
    setSelectedCategories([]);
  };

  return {
    categories,
    selectedCategories,
    addCategoryFilter,
    removeCategoryFilter,
    clearCategoryFilters,
  };
};

export default useCategoryFilter;
