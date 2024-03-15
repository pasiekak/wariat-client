import { ICategory } from "../../attributes/types/ICategory";
import { IMark } from "../../attributes/types/IMark";

interface IProduct {
  id: number;
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  maxQuantity: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IProductExtendedByFn extends IProduct {
  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
  categories: ICategory[];
  marks: IMark[];
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
}

interface ISingleProductShort {
  id: number;
  name: string;
  maxQuantity: number;
  priceBrutto: number;
  published: boolean;

  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
}

interface ISingleProductExtended {
  id: number;
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  maxQuantity: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;

  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
  categories: ICategory[];
  marks: IMark[];
  updateAttribute: (
    attribute: ICategory | IMark,
    attributeNameMany: string,
    type: string,
  ) => void;
}

export type {
  IProduct,
  ISingleProductShort,
  ISingleProductExtended,
  IProductExtendedByFn,
};
