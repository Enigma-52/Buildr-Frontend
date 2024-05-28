import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0 max-w-4xl mx-auto">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold mb-4 text-purple-500 font-heading">Welcome to Our SaaS Platform</h1>
          <p className="text-xl mb-8 text-gray-400">Effortlessly manage your business with our powerful tools.</p>
          <button onClick={handleGetStarted} className="px-6 py-3 text-lg font-semibold text-black bg-purple-500 rounded-full hover:bg-purple-400 transition duration-300">
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img src="your-image-url.jpg" alt="SaaS Platform" className="rounded-lg shadow-lg max-w-full mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
