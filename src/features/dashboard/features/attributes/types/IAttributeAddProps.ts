import { IMark } from "../../../../../api/types/IMark";
import { ICategory } from "../../../../../api/types/ICategory";

export interface IAttributeAddProps {
  attributeNameMany: string;
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
}
