import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import Checkoutform from './Checkoutform';
import { loadStripe } from '@stripe/stripe-js';

//to do : add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    return (
        <div>
            <h2>Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <Checkoutform>

                    </Checkoutform>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;