import { IMark } from "./IMark";
import { ICategory } from "./ICategory";

export interface IAttributeAddProps {
  attributeNameMany: string;
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
  setApiMessage: (message: string | null) => void;
}
