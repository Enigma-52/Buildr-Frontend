/*global Razorpay*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Payment = () => {
  const { width, height } = useWindowSize();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const processStripePayment = async () => {
  };

  const processRazorpayPayment = async () => {
    const amount = 39;
    const currency = 'INR';
    const receipt = 'Buildr Profile Lifetime Fee';

    try {
        const response = await fetch('http://localhost:5000/createPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, currency, receipt })
        });

        const data = await response.json();
        const orderId = data.orderId;
        const orderAmount = data.amount;

        const options = {
            key: "rzp_test_KLT9mlioFTVucO",
            amount: orderAmount,
            currency: currency,

            name: 'Buildr',
            checkout: {
              name: "Buildr"
            },
            description: 'Buildr Profile Lifetime Fee',
            order_id: orderId,
            handler: async function(response) {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const signature = response.razorpay_signature;

                    console.log("hi");

                    const successResponse = await fetch('http://localhost:5000/paymentSuccess', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ orderId, paymentId, signature }),
                    });
                
                    console.log("Payment Response");
                
                    if (successResponse.ok) {
                      const data = await successResponse.json();
                      console.log(data);
                      return <Confetti width={width} height={height} recycle={false} />;
                    } else {
                      const errorData = await successResponse.json();
                      console.error('Payment failed:', errorData);
                      alert('Payment failed');
                    }
                } catch (error) {
                    console.error('Error processing payment:', error);
                    alert('Payment failed');
                }
            },
            theme: {
                color: '#3399cc'
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Error creating payment:', error);
        alert('Error creating payment');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Just one Last Step!</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={processStripePayment}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-green-500 transition duration-300"
          >
            Pay ₹39 via Stripe (Coming Soon)
          </button>
          <button
            onClick={processRazorpayPayment}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
          >
            Pay ₹39 via Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
