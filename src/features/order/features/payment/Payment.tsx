import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  Stripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { IFinalOrder } from "../../types/IFinalOrder.ts";
import { CartProduct } from "../../../cart/types/CartContextTypes.ts";

import "./styles/styles.ts";
import CheckoutForm from "./components/CheckoutForm.tsx";

type PaymentProps = {
  orderDetails: IFinalOrder;
  products: CartProduct[];
};

const Payment = ({ orderDetails, products }: PaymentProps) => {
  const [loading, setLoading] = useState(true);

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  // Effect to fetch publishable stripe key
  useEffect(() => {
    axios.get("/api/payment/config").then((res) => {
      if (res.status === 200) {
        setStripePromise(loadStripe(res.data.publishableKey));
      }
    });
  }, []);

  // Effect to check if order data collected from user is correct. Server side do the verifications.
  useEffect(() => {
    axios
      .post("/api/payment/create-payment-intent", { ...orderDetails, products })
      .then((res) => {
        if (res.status === 200) {
          const clientSecret = res.data.clientSecret;
          setClientSecret(clientSecret);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {loading || !clientSecret || !stripePromise ? (
        <Spinner />
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
