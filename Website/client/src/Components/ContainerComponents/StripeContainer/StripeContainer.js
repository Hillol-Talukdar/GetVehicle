import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '../../Forms/StripePaymentForm';
import './StripeContainer.css';

const StripeContainer = ({
  totalPayableAmount,
  user,
  userPhoneNumber,
  vehicleData,
  changeHandlerStripePaymentSuccess,
}) => {
  const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  return (
    <div className="stripe-container-div">
      <Elements stripe={stripeTestPromise}>
        <StripePaymentForm
          totalPayableAmount={totalPayableAmount}
          user={user}
          userPhoneNumber={userPhoneNumber}
          vehicleData={vehicleData}
          changeHandlerStripePaymentSuccess={changeHandlerStripePaymentSuccess}
        />
      </Elements>
    </div>
  );
};

export default StripeContainer;
