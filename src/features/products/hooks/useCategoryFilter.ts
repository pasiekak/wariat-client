import { useEffect, useState } from "react";
import { ICategory } from "../../../api/types/ICategory";
import useCategory from "../../../api/hooks/category/useCategory";
import { useCategoryFilterReturns } from "../types/useCategoryFilterReturns";
import { useSessionStorage } from "../../../hooks/useStorage";

const useCategoryFilter = (): useCategoryFilterReturns => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useSessionStorage<
    ICategory[]
  >("products-selected-categories", []);

  const { data } = useCategory();

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data?.categories, setCategories]);

  useEffect(() => {
    if (categories.length > 0 && selectedCategories.length > 0) {
      setSelectedCategories((prev) =>
        prev.filter((selectedCategory) =>
          categories.some(
            (category) => selectedCategory.name === category.name,
          ),
        ),
      );
    }
  }, [categories.length, selectedCategories.length]);

  const addCategoryFilter = (category: ICategory) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  const removeCategoryFilter = (category: ICategory) => {
    setSelectedCategories((prev: ICategory[]) =>
      prev.filter((c) => c.id !== category.id),
    );
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
