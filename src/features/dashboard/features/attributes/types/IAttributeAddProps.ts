import { ICategory } from "../../../../../api/types/ICategory";

export interface IAttributeAddProps {
  attributeNameMany: string;
  updateAttribute: (
    attribute: ICategory | ICategory,
    attributeNameMany: string,
    type: string,
  ) => void;
}
