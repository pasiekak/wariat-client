import { ICategory } from "../../../../../api/types/ICategory";
import { IProduct } from "../../../../../api/types/IProduct";

interface IProductExtendedByFn extends IProduct {
  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
  categories: ICategory[];
  marks: ICategory[];
  updateAttribute: (
    attribute: ICategory | ICategory,
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
  youtubeURL: string | null;
  maxQuantity: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;

  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
  categories: ICategory[];
  marks: ICategory[];
  updateAttribute: (
    attribute: ICategory | ICategory,
    attributeNameMany: string,
    type: string,
  ) => void;
}

interface IProductsList {
  products: IProduct[];
  setOpen: (id: number | ((prev: number | null) => number | null)) => void;
  openedProduct: number | null;
  categories: ICategory[];
  marks: ICategory[];
  updateAttribute: (
    attribute: ICategory | ICategory,
    attributeNameMany: string,
    type: string,
  ) => void;
}

export type {
  IProduct,
  ISingleProductShort,
  ISingleProductExtended,
  IProductExtendedByFn,
  IProductsList,
};
