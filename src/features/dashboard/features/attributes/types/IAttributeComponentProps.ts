import { ICategory } from "../../../../../api/types/ICategory";
import { IMark } from "../../../../../api/types/IMark";

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
