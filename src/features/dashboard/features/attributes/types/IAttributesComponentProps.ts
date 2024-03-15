import { IMark } from "./IMark";
import { ICategory } from "./ICategory";

export interface IAttributesComponentProps {
  productID: number;
  attributeNameMany: string;
  attributes: (ICategory | IMark)[];
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
}
