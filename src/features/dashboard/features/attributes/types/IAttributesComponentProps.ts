import { ICategory } from "../../../../../api/types/ICategory";

export interface IAttributesComponentProps {
  productID: number;
  attributeNameMany: string;
  attributes: (ICategory | ICategory)[];
  updateAttribute: (
    attribute: ICategory | ICategory,
    attributeNameMany: string,
    type: string,
  ) => void;
}
