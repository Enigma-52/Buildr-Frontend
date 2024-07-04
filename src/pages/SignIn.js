import React, { useState, useEffect } from 'react';
import { signInWithGooglePopup } from "../utils/firebase.utils"
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils"

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

const SignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      sendUserDataToBackend(user);
      navigate('/username');
    }
  }, [user, navigate]);

  const sendUserDataToBackend = async (user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User data sent to backend:', data);
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
};

  return (
<div className="relative min-h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-0" style={{ maskImage: 'radial-gradient(transparent, white)' }} />               
            <Boxes />
                  <div className="pb-20">
              <Box sx={{ width: '100%', mx: 'auto', my: 5 }}>
              <Stepper
                activeStep={0}
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
      <div className="z-50 bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Sign In</h2>
        <button
          onClick={logGoogleUser}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
