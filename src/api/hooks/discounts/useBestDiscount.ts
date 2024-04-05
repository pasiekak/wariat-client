import { useEffect, useState } from "react";
import axios from "axios";
import { BestDiscount } from "../../types/IBestDiscount";

type useBestDiscountProps = {
  productID: number;
};

const useBestDiscount = (props: useBestDiscountProps) => {
  const [bestDiscount, setBestDiscount] = useState<BestDiscount | null>(null);

  useEffect(() => {
    axios.get(`/api/products/${props.productID}/best-discount`).then((res) => {
      if (res.status === 200) {
        if (res.data.discount.percentage > 0)
          setBestDiscount(res.data.discount);
      }
    });
  }, [props.productID]);

  return bestDiscount;
};

export default useBestDiscount;
