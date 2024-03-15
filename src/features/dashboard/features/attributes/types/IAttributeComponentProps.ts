import { ICategory } from "./ICategory";
import { IMark } from "./IMark";

export interface IAttributeComponentProps {
  productID: number;
  attribute: ICategory | IMark;
  attributeNameMany: string;
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
  selected: boolean;
  addSelectedAttribute: (attribute: ICategory | IMark) => void;
  removeSelectedAttribute: (attribute: ICategory | IMark) => void;
}
