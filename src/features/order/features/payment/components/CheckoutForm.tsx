import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);

  const { t } = useTranslation(undefined, {
    keyPrefix: "components.order.payment",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("unexpected-error");
    }
    setIsProcessing(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h1>{t("title")}</h1>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            t("pay")
          )}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
