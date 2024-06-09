import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";

const Payment = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const processStripePayment = async () => {
    try {
      console.log('Processing payment via Stripe...');
      
    } catch (error) {
      console.error('Error processing payment via Stripe:', error);
    }
  };

  const processRazorpayPayment = async () => {
    try {
      console.log('Processing payment via Razorpay...');
      
    } catch (error) {
      console.error('Error processing payment via Razorpay:', error);
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
            Pay ₹39 via Stripe
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
