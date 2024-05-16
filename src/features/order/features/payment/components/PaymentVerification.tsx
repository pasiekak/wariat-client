import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Payment from "../Payment.tsx";
import { OrderContext } from "../../../context/OrderContext.tsx";
import { CartContext } from "../../../../cart/context/CartContext.tsx";
import { finalOrderSchema } from "../schemas/finalOrderSchema.ts";

const PaymentVerification = () => {
  const { finalOrder } = useContext(OrderContext);
  const { cartProducts } = useContext(CartContext);
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    finalOrderSchema
      .validate(finalOrder)
      .then((res) => {
        setAccess(true);
      })
      .catch((error) => {
        setAccess(false);
      })
      .finally(() => setLoading(false));
  }, [finalOrder]);

  if (!loading) {
    if (access) {
      return <Payment orderDetails={finalOrder} products={cartProducts} />;
    } else {
      return <Navigate to="/" replace={true} />;
    }
  }
};

export default PaymentVerification;
