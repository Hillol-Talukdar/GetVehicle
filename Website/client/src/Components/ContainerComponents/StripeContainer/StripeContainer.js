import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '../../Forms/StripePaymentForm';
import './StripeContainer.css'

const StripeContainer = () => {
  // const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const stripeTestPromise = loadStripe("pk_test_51MEGAdGTvGfjyIppLoVD4oiXvOL7GxNIWdPezS8VKMI6PbOyxVZY9TPjZ2OMkQhJHu4kU4ocgQVELOXCbotfxD2v00Cmq1rAgH");

  return (
    <Elements stripe={stripeTestPromise} >
      <StripePaymentForm />
    </Elements>
  );
};

export default StripeContainer;
