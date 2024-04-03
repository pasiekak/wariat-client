import { useState } from "react";
import { usePriceFilterReturns } from "../types/usePriceFilterReturns";

const usePriceFilter = (): usePriceFilterReturns => {
  const [maxPrice, setMaxPrice] = useState(99999);
  const [minPrice, setMinPrice] = useState(0);

  const changeMaxPrice = (newMax: number) => {
    setMaxPrice(newMax);
  };

  const changeMinPrice = (newMin: number) => {
    setMinPrice(newMin);
  };

  return { maxPrice, minPrice, changeMaxPrice, changeMinPrice };
};

export default usePriceFilter;
