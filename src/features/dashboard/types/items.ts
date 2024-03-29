import { IProduct } from "../../../api/types/IProduct";
import { IUser } from "../features/users/types/IUser";
import { IEvent } from "../../../api/types/IEvent";

export interface IProductsItems {
  count: number;
  rows: IProduct[];
}

export interface IUsersItems {
  count: number;
  rows: IUser[];
}

export interface IEventsItems {
  count: number;
  rows: IEvent[];
}

export interface IItems {
  count: number;
  rows: (IUser | IProduct | IEvent)[];
}
