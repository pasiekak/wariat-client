import { BestDiscount } from "../../../../../api/types/IBestDiscount";
import { useEffect, useState } from "react";
import {
  calculateDifference,
  calculateFinalPrice,
} from "../../../../../utils/priceFunctions";
import { useTranslation } from "react-i18next";

type FinalPriceProps = {
  bestDiscount: BestDiscount | null;
  selectedQuantity: number;
  priceBrutto: number;
  available: boolean;
};

const FinalPrice = (props: FinalPriceProps) => {
  const [finalPriceWithoutDiscount, setFinalPriceWithoutDiscount] =
    useState<number>();
  const [finalPrice, setFinalPrice] = useState<number>();

  const { t } = useTranslation(undefined, { keyPrefix: "components.product" });

  useEffect(() => {
    if (props.priceBrutto) {
      setFinalPrice(
        calculateFinalPrice(
          props.priceBrutto,
          props.bestDiscount?.percentage ? props.bestDiscount.percentage : 0,
          props.selectedQuantity,
        ),
      );
      setFinalPriceWithoutDiscount(
        calculateFinalPrice(props.priceBrutto, 0, props.selectedQuantity),
      );
    }
  }, [props.priceBrutto, props.bestDiscount, props.selectedQuantity]);

  return (
    <div className={`final-price-wrapper`}>
      {props.bestDiscount && (
        <span className={"discount-difference"}>
          {t("discount-difference", {
            difference: calculateDifference(
              props.priceBrutto,
              props.bestDiscount.percentage,
              props.selectedQuantity,
            ).toFixed(2),
          })}
        </span>
      )}
      <div className={`your-price-wrapper`}>
        <span>{t("your-price")}</span>
        <span className={`final-price`}>{finalPrice?.toFixed(2)} zł</span>
        {props.bestDiscount && finalPriceWithoutDiscount && (
          <span className={`final-price-without-discount`}>
            {finalPriceWithoutDiscount.toFixed(2)} zł
          </span>
        )}
      </div>
    </div>
  );
};

export default FinalPrice;
