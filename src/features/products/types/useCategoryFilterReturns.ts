import { ICategory } from "../../../api/types/ICategory";

export type useCategoryFilterReturns = {
  categories: ICategory[];
  selectedCategories: ICategory[];
  addCategoryFilter: (category: ICategory) => void;
  removeCategoryFilter: (category: ICategory) => void;
  clearCategoryFilters: () => void;
};
