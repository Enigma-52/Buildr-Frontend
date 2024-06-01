import React, { useState, useEffect } from 'react';
import { signInWithGooglePopup } from "../utils/firebase.utils"
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils"

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
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <button
          onClick={logGoogleUser}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
        >
          Sign in with Google
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-400">or</span>
        </div>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg" type="email" id="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg" type="password" id="password" />
          </div>
          <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition duration-300">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
