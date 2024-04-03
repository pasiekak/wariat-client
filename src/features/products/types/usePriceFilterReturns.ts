export type usePriceFilterReturns = {
  maxPrice: number;
  minPrice: number;
  changeMaxPrice: (newMax: number) => void;
  changeMinPrice: (newMin: number) => void;
};