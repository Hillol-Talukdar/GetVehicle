import React, { useState } from 'react';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './StripePaymentForm.css';
import { toast } from 'react-toastify';

const StripePaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          'http://localhost:4000/api/stripe-payment',
          {
            amount: 1000,
            id,
          }
        );

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
          window.alert(`Payment successful`);
          window.location.replace('/');
        }
      } catch (error) {
        console.log('Error', error);
        toast.error('Error', error);
      }
    } else {
      console.log(error.message);
      toast.error(error.message);
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
        <button className="stripeButton">Pay</button>
      </form>
    </>
  );
};

export default StripePaymentForm;
