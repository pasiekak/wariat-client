import { returns } from "../../pagination/types/returns";
import { IProduct } from "../../../api/types/IProduct";

export interface IOutletContext extends returns {
  products: IProduct[];
}
