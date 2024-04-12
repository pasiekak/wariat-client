import { IDiscountGroup } from "../../../api/types/IDiscountGroup";
import { IDiscount } from "../../../api/types/IDiscount";

export interface IAccountDiscounts {
  discountGroup: IDiscountGroup;
  otherDiscounts: IDiscount[];
}
