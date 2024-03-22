import { IProductsItems, IUsersItems } from "./items";
import IProductForm from "../features/products/features/manage/features/modifying/types/productForm";
import { IOrder } from "./IOrder";
import { IBanner } from "../../message-banner/types/IBanner";

export interface IDefaultOutletContext {
  tableName: string;
  setTableName: (tableName: string) => void;
  order: IOrder;
  loading: boolean;
  fetchData: () => void;
  updateOrder: (by: string, direction: string) => void;
  addBanner: (banner: IBanner) => void;
}

export interface IProductsOutletContext extends IDefaultOutletContext {
  items: IProductsItems;
  updateItem: (id: number, data: IProductForm) => void;
}

export interface IUsersOutletContext extends IDefaultOutletContext {
  items: IUsersItems;
}

export interface IUsersOutletContext {}
