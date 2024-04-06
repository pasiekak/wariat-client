import { usePriceFilterReturns } from "../types/usePriceFilterReturns";
import { useSessionStorage } from "../../../hooks/useStorage";

const usePriceFilter = (): usePriceFilterReturns => {
  const [maxPrice, setMaxPrice] = useSessionStorage<number>(
    "products-max-price",
    99999,
  );
  const [minPrice, setMinPrice] = useSessionStorage<number>(
    "products-min-price",
    0,
  );

  const changeMaxPrice = (newMax: number) => {
    setMaxPrice(newMax);
  };

  const changeMinPrice = (newMin: number) => {
    setMinPrice(newMin);
  };

  const clearPrices = () => {
    setMinPrice(0);
    setMaxPrice(99999);
  };

  return { maxPrice, minPrice, changeMaxPrice, changeMinPrice, clearPrices };
};

export default usePriceFilter;
