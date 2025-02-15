import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../../Authprovider/Authprovider';
import useAxiosPublic from '../../Hooks/useAxiospublic';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dark } from '@mui/material/styles/createPalette';

const Checkoutform = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [part, setPart] = useState({});
    // const [status, setStatus] = useState('')
    const { user } = useContext(authcontext);
    const stripe = useStripe();
    const elements = useElements();
    const axiospublic = useAxiosPublic();
    const { id } = useParams();  // Extract id from useParams directly

    // Fetch participation data and create payment intent
    useEffect(() => {
        if (user?.email) {
            axiospublic.get(`/participate/pay/${id}`)
                .then(response => {
                    const participationData = response.data;
                    setPart(participationData);
                    console.log('Participation Data:', participationData);

                    // Create payment intent using camp fees
                    const itemPrice = participationData.campFees;
                    axios.post('http://localhost:5000/create-payment-intent', { price: itemPrice })
                        .then(paymentResponse => {
                            setClientSecret(paymentResponse.data.clientSecret);
                        })
                        .catch(paymentError => console.error('Error creating payment intent:', paymentError));
                })
                .catch(fetchError => console.error('Error fetching participation data:', fetchError));
        }
    }, [user?.email, id, axiospublic]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setLoading(false);
            return;
        }

        // Create payment method
        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        console.log('Payment Method:', paymentMethod);

        // Confirm payment intent
        if (clientSecret) {
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anynomas',
                        email: user?.email || 'anynomas',
                    }
                },
            });

            if (confirmError) {
                setError(confirmError.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess(true);
                console.log('Payment Successful:', paymentIntent);
                // setStatus(`${paymentIntent.status}`)
                const payment = {
                    campName: part.campName,
                    email: user.email,
                    price: part.campFees,
                    date: new Date(),
                    campId: part._id,
                    paymentstatus: paymentIntent.status,
                    confirmstatus: 'pending'
                }

                axiospublic.post('/payment', payment)
                    .then(res => {
                        console.log(res.data);
                    })
                axiospublic.patch(`participate/paystatus/${part._id}`)
                    .then(res => {
                        console.log(res.data);
                    })
            }
            //now save the payment history in the database
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
            {part && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{part.campName}</h2>
                    <p className="text-gray-700">Price: ${part.campFees}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className={`p-3 w-full mt-6 rounded-lg ${loading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    type="submit"
                    disabled={!stripe || loading || success || !clientSecret}
                >
                    {loading ? 'Processing...' : success ? 'Payment Successful!' : `Pay $${part?.campFees || ''}`}
                </button>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default Checkoutform;
