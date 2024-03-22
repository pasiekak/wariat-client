import { IMark } from "../../../../../api/types/IMark";
import { ICategory } from "../../../../../api/types/ICategory";

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
