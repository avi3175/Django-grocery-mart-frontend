import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-react-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = ({ cartTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Call your backend to create a PaymentIntent
    const { data: { client_secret } } = await axios.post("http://localhost:8000/api/cart_and_order/order/", {
      amount: cartTotal,
    });

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // Notify the user and clear the cart
        alert("Payment successful!");
        // Add your code to clear the cart here
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>Pay</button>
      {error && <div>{error}</div>}
    </form>
  );
};

const PaymentPage = ({ cartTotal }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartTotal={cartTotal} />
    </Elements>
  );
};

export default PaymentPage;
