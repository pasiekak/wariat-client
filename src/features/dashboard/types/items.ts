import { IProduct } from "../features/products/types/product";
import { IUser } from "../features/users/types/IUser";

export interface IProductsItems {
  count: number;
  rows: IProduct[];
}

export interface IUsersItems {
  count: number;
  rows: IUser[];
}

export interface IItems {
  count: number;
  rows: (IUser | IProduct)[];
}
