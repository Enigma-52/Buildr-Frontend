
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";

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

const Username = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

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
        if (user?.uid) {
            const fetchUsername = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getUsername?userId=${user.uid}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch username');
                    }
                    const data = await response.json();
                    setUsername(data.username);
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            };
            fetchUsername();
        }
    }, [user?.uid]);
    
    
      const handleLogout = async () => {
        try {
          await auth.signOut();
          navigate('/');
        } catch (error) {
          console.error('Logout error:', error.message);
        }
      };
    
      if (!user) {
        return <p>Loading...</p>;
      }

      const isUsernameUnique = async (username) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/checkUsername/${username}?userId=${userId}`);
          if (!response.ok) {
            throw new Error('Failed to check username');
          }
          const data = await response.json();
          return data.unique;
        } catch (error) {
          console.error('Error checking username uniqueness:', error);
          return false;
        }
      };



      const handleInputChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handleSubmit = async () => {

        const unique = await isUsernameUnique(username);
          if (!unique) {
            alert('Username is not unique. Please choose another.');
            return;
          }
        
            const id = user.uid;
            console.log(id);
            const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/buildrUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    username,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update username');
            }
            
            const data = await response.json();
            alert(`Your unique link is buildr-waitlist.vercel.app/${username}`);
            navigate('/form');
        };
    
        return (
          
          <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-0" style={{ maskImage: 'radial-gradient(transparent, white)' }} />               
            <Boxes />
            <div className="pb-20">
              <Box sx={{ width: '100%', mx: 'auto', my: 5 }}>
              <Stepper
                activeStep={1}
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
            <div className="z-40 bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl w-full z-200">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Enter Your Buildr Username</h2>
              <div className="flex items-center mb-4">
                <div className="bg-gray-700 text-white rounded-l-lg px-5 py-2">
                  <span className="text-xl">mybuildr.online/u/</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Type your username"
                  className="px-2 text-xl py-2 bg-gray-700 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="text-xl w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
                >
                  Submit
                </button>
              </div>
              <div className="pt-6">
                <button
                  onClick={handleLogout}
                  className="text-xl w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        );        
};

export default Username;
