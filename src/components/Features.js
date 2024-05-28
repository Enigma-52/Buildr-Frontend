// src/components/Features.js
import React from 'react';

const Features = () => {
  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-5xl font-bold mb-12 text-center">Our Features</h2>
        <div className="grid grid-cols-1 gap-12">
          <div className="flex items-center justify-center">
            <div className="w-1/3 flex justify-center">
              <img src="feature-image-1.jpg" alt="Feature 1" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-2/3">
              <p className="text-lg text-center">Feature 1 Description</p>
            </div>
          </div>
          <hr className="my-12 border-gray-600" />
          <div className="flex items-center justify-center">
            <div className="w-2/3">
              <p className="text-lg text-center">Feature 2 Description</p>
            </div>
            <div className="w-1/3 flex justify-center">
              <img src="feature-image-2.jpg" alt="Feature 2" className="rounded-lg shadow-lg" />
            </div>
          </div>
          <hr className="my-12 border-gray-600" />
          <div className="flex items-center justify-center py-10">
            <div className="w-1/3 flex justify-center">
              <img src="feature-image-3.jpg" alt="Feature 3" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-2/3">
              <p className="text-lg text-center">Feature 3 Description</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
