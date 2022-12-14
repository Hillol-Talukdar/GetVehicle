import React, { useState } from 'react';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './StripePaymentForm.css';
import { toast } from 'react-toastify';

const StripePaymentForm = ({
  totalPayableAmount,
  user,
  userPhoneNumber,
  vehicleData,
}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { err, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!err) {
      try {
        console.log('totalPayableAmount ', totalPayableAmount);
        const { id } = paymentMethod;
        const response = await axios.post(
          'http://localhost:4000/api/stripe-payment',
          {
            amount: totalPayableAmount,
            user: user,
            userPhoneNumber: userPhoneNumber,
            vehicleData: vehicleData,
            id,
          }
        );

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
          setLoading(false);
          window.alert(`Payment successful`);
          window.location.replace('/');
        }
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    } else {
      setLoading(false);
      console.log(err.message);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement />
          </div>
        </fieldset>

        {loading ? (
          <button className="stripeButton" disabled>
            Paying
          </button>
        ) : (
          <button className="stripeButton">Pay</button>
        )}
      </form>
    </>
  );
};

export default StripePaymentForm;
