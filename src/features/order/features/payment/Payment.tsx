import { IFinalOrder } from "../../types/IFinalOrder.ts";
import { CartProduct } from "../../../cart/types/CartContextTypes.ts";
import { useEffect } from "react";
import axios from "axios";

type PaymentProps = {
  orderDetails: IFinalOrder;
  products: CartProduct[];
};

const Payment = ({ orderDetails, products }: PaymentProps) => {
  useEffect(() => {
    axios
      .post("/api/payment/create-payment-intent", { ...orderDetails, products })
      .then((res) => {
        console.log(res);
      });
  }, []);
  return null;
};

export default Payment;
