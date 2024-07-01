import React from 'react';
import { useNavigate } from 'react-router-dom';

const MSP = () => {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

    return (
      <section className="bg-gradient-to-b from-black to-purple-300 text-white py-40 ">  {/* Added mb-24 for margin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Unlock Your Business Potential</h2>
            <p className="text-xl mb-8">Experience unparalleled growth with our innovative SaaS platform.</p>
            <button onClick={handleGetStarted} className="px-8 py-4 text-lg font-semibold bg-white text-black rounded-full hover:bg-black hover:text-white transition duration-300">Get Started</button>
          </div>
        </div>
      </section>
    );
  };  

export default MSP;
