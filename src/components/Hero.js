import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/img2.jpeg';  
import { BackgroundGradient } from "../components/ui/background-gradient.tsx";

const Hero = () => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <header className="py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="#"
                title=""
                className="text-4xl font-medium text-white flex rounded outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
              >
                Buildr
              </a>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-white"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
              <a
                href="#"
                title=""
                className="text-base font-medium text-white transition-all duration-200 rounded focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
              >
                Features
              </a>
              <a
                href="#"
                title=""
                className="text-base font-medium text-white transition-all duration-200 rounded focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
              >
                Pricing
              </a>
              <a
                href="#"
                title=""
                className="text-base font-medium text-white transition-all duration-200 rounded focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
              >
                Contact Us
              </a>
            </div>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <a
                href="#"
                title=""
                className="text-base font-medium text-white transition-all duration-200 rounded focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
              >
              </a>
              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-purple-600 border border-transparent rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
                role="button"
              >
                Sign up
              </a>
            </div>
          </div>

          {expanded && (
            <nav>
              <div className="px-1 py-8">
                <div className="grid gap-y-7">
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-white transition-all duration-200 rounded-xl hover:bg-gray-800 focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-white transition-all duration-200 rounded-xl hover:bg-gray-800 focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    Pricing
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-white transition-all duration-200 rounded-xl hover:bg-gray-800 focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    Automation
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-white transition-all duration-200 rounded-xl hover:bg-gray-800 focus:outline-none hover:text-purple-400 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    Customer Login
                  </a>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-purple-600 border border-transparent rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
                    role="button"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="pt-12 bg-black sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-300 font-inter">
              Smart email campaign builder, made for Developers
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-white sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Turn your visitors into profitable
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#7F00FF] via-[#E100FF] to-[#FF7C7C] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative"> business </span>
              </span>
            </p>
            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-purple-600 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
                role="button"
              >
                Get more customers
              </a>
              <a
                href="#"
                title=""
                className="text-white inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-black transition-all duration-200 border-2 border-purple-600 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:bg-black focus:bg-black hover:text-white focus:text-white hover:border-purple-600 focus:border-purple-600"
                role="button"
              >
                Watch free demo
              </a>
            </div>
          </div>
        </div>

        <div className="p-12 bg-black">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-black"></div>
            <div className="relative mx-auto">
            
              <div className="lg:max-w-6xl lg:mx-auto flex justify-center">
              <BackgroundGradient className="rounded-lg p-2 dark:bg-zinc-900">
                <img
                  className="rounded-lg shadow-xl transform hover:scale-104 transition-transform duration-500 ease-in-out"
                  src={img1}
                  alt="Illustration"
                />
                </BackgroundGradient>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
