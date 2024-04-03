import { ICategory } from "../../../../../api/types/ICategory";

export interface IAttributeComponentProps {
  productID: number;
  attribute: ICategory | ICategory;
  attributeNameMany: string;
  updateAttribute: (
    attribute: ICategory | ICategory,
    attributeNameMany: string,
    type: string,
  ) => void;
  selected: boolean;
  addSelectedAttribute: (attribute: ICategory | ICategory) => void;
  removeSelectedAttribute: (attribute: ICategory | ICategory) => void;
}
