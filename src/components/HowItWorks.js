import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-13 bg-purple-300 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-800">
            A step-by-step guide to help you get started. Follow these simple steps to begin your journey.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="Curved Dotted Line"
              style={{ filter: "brightness(0) saturate(100%)" }}
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {/* Step 1 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-700 rounded-full shadow-xl transition duration-300">
                <span className="text-2xl font-bold text-gray-900">1</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Create an Account
              </h3>
              <p className="mt-4 text-base text-gray-800">
                Sign up and choose your Unique Portfolio URL
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-700 rounded-full shadow-xl transition duration-300">
                <span className="text-2xl font-bold text-gray-900">2</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Build Your Website
              </h3>
              <p className="mt-4 text-base text-gray-800">
                Use our tools to create your stunning portfolio
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-700 rounded-full shadow-xl transition duration-300">
                <span className="text-2xl font-bold text-gray-900">3</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Launch & Grow
              </h3>
              <p className="mt-4 text-base text-gray-800">
                Publish your website and start attracting potential employers for opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
