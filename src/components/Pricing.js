import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <section className="bg-black text-white py-0">
        <div class="bg-gradient-to-b from-purple-300 to-purple-600">
            <div class="container m-auto px-6 py-20 md:px-12 lg:px-20">
                <div class="m-auto text-center lg:w-8/12 xl:w-7/12">
                    <h2 class="text-2xl text-black font-bold md:text-4xl py-2">Create your Buildr Page for free</h2>
                    <h5 class="text-md text-gray-600 md:text-2xl">Get the lifetime deal when you are ready to publish!</h5>
                </div>
                <div class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
                    <div class="py-12 relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
                        <div aria-hidden="true" class="absolute top-0 w-full h-full rounded-2xl bg-gray-700 shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
                        <div class="relative p-6 space-y-6 lg:p-8">
                            <h3 class="text-3xl text-white font-semibold text-center">Showcase Yourself</h3>
                            <div>
                                <div class="relative flex justify-around">
                                    <div class="flex items-end">
                                        <span class="block text-3xl text-purple-400 font-bold"><s>$79</s></span>
                                        <span class="text-7xl text-white font-bold leading-0">$29</span>
                                        <span class="block text-1xl text-purple-200 font-bold">USD</span>
                                    </div>
                                </div>
                            </div>
                            <p class="flex items-center justify-center space-x-4 text-lg text-white text-center">
                                <span>Create your Buildr Profile Now!</span>
                            </p>
                            <button onClick={handleGetStarted} title="Submit" class="block w-full py-3 px-6 text-center rounded-xl transition bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:bg-indigo-600">
                                <span class="text-white font-semibold">
                                    Claim your page
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="relative group md:w-6/12 lg:w-7/12">
                        <div aria-hidden="true" class="absolute top-0 w-full h-full rounded-2xl bg-gray-900 shadow-lg transition duration-500 group-hover:scale-105"></div>
                        <div class="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16">
                            <ul role="list" class="space-y-4 py-6 text-white">
                                <li class="space-x-2">
                                    <span>&#9989; Comprehensive portfolio creation and hosting.</span>
                                </li>
                                <li class="space-x-2">
                                    
                                    <span>&#9989; Make changes to your portfolio anytime.</span>
                                </li>
                                <li class="space-x-2">
                                    <span>&#9989; Multiple themes to choose from</span>
                                </li>
                                <li class="space-x-2">
                                    <span>&#9989; Pay once, use Forever</span>
                                </li>
                            </ul>
                            <p class="text-white">Enjoy lifetime hosting for your developer portfolio, ensuring your projects are always accessible without additional fees.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Pricing;
