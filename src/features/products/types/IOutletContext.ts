import { usePaginationReturns } from "../../pagination/types/usePaginationReturns";
import { IProduct } from "../../../api/types/IProduct";
import { useSearchReturns } from "./useSearchReturns";
import { useCategoryFilterReturns } from "./useCategoryFilterReturns";
import { useMarkFilterReturns } from "./useMarkFilterReturns";
import { usePriceFilterReturns } from "./usePriceFilterReturns";
import { useDisplayReturns } from "./useDisplayReturns";

export interface IOutletContext
  extends usePaginationReturns,
    useSearchReturns,
    useCategoryFilterReturns,
    useMarkFilterReturns,
    usePriceFilterReturns,
    useDisplayReturns {
  products: IProduct[];
  loading: boolean;
}
