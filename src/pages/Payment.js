/* global Razorpay */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Boxes } from "../components/ui/background-boxes.tsx";
import { cn } from "../utils/cn.ts";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Sign in to Buildr',
  'Select your Unique Username',
  'Create your Buildr Profile',
  'Upload your Profile Picture',
  'Complete payment',
  'View your Portfolio',
];

const Payment = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [user, setUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/signin');
      }else {
        setUserId(user.uid); 
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const processStripePayment = async () => {
  };

  const updatePaidStatus = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/updatePaidStatus?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error updating paid status:', error);
    }
};

  
  useEffect(() => {
    const checker = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/paidStatus?userId=${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("PAID STATUS");
          console.log(data);
          setUsername(data.username);
          if(data.paidStatus === "true")
            {
              console.log(username);
              setTimeout(() => {
                navigate(`/u/${data.username}`);
              }, 200);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred: ' + error.message);
        }
    };

    if(userId){
      setTimeout(() => {
        checker();
      }, 500);
    }
  }, [user?.uid]);

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
                      setShowConfetti(true);
                      setShowModal(true);

                      await updatePaidStatus(userId);
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

  const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
  <div className="bg-gray-800 rounded-lg p-8 z-10 max-w-sm mx-auto text-center shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-white">Congratulations!</h2>
    <p className="mb-6 text-white">Your profile is complete.</p>
    <a href={`/u/${username}`} className="block mb-4 text-blue-400 underline">View your profile</a>
  </div>
</div>

    );
  };

  return (
<div className="relative min-h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-0" style={{ maskImage: 'radial-gradient(transparent, white)' }} />               
            <Boxes />
                  {showConfetti && <Confetti numberOfPieces={600} tweenDuration={50000} width={width} height={height} recycle={false} />}
      <div className="pb-20">
              <Box sx={{ width: '100%', mx: 'auto', my: 5 }}>
              <Stepper
                activeStep={4}
                alternativeLabel
                sx={{
                  bgcolor: 'transparent',
                  '& .MuiStepLabel-label': {
                    color: 'white !important',
                  },
                  '& .MuiStepConnector-line': {
                    borderColor: 'white',
                  },
                  '& .MuiStepIcon-root': {
                    color: 'primary.main',
                    '&.Mui-active': {
                      color: 'secondary.main',
                    },
                    '&.Mui-completed': {
                      color: 'success.main',
                    },
                  },
                  '& .MuiStepIcon-text': {
                    fontSize: 20,
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            </div>
      <div className="z-40 bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Just one Last Step!</h2>
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
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Payment;