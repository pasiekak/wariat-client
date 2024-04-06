import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../../types/IOutletContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PriceRangePicker = () => {
  const context = useOutletContext<IOutletContext>();
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.filters",
  });
  const [min, setMin] = useState(context.minPrice);
  const [max, setMax] = useState(context.maxPrice);

  useEffect(() => {
    setMin(context.minPrice);
    setMax(context.maxPrice);
  }, [context.minPrice, context.maxPrice]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (e.target.id === "max") setMax(val);
    if (e.target.id === "min") setMin(val);
  };

  const handleMouseUp = (type: string) => {
    if (type === "min") context.changeMinPrice(min);
    if (type === "max") context.changeMaxPrice(max);
  };

  return (
    <div className="price-range-picker">
      <div className="min-price">
        <label htmlFor="min">
          {t("price-min-filter-label")} ({min} zł)
        </label>
        <input
          id="min"
          min={0}
          disabled={context.loading}
          max={max}
          value={min}
          type="range"
          onMouseUp={() => handleMouseUp("min")}
          onChange={handleChange}
          onTouchEnd={() => handleMouseUp("min")}
        />
      </div>
      <div className="max-price">
        <label htmlFor="max">
          {t("price-max-filter-label")} ({max} zł)
        </label>
        <input
          id="max"
          min={min}
          max={99999}
          disabled={context.loading}
          value={max}
          type="range"
          onMouseUp={() => handleMouseUp("max")}
          onChange={handleChange}
          onTouchEnd={() => handleMouseUp("max")}
        />
      </div>
    </div>
  );
};

export default PriceRangePicker;
