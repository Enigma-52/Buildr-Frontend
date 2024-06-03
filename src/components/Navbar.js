import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-center items-center px-4">
        <div className="text-3xl font-bold font-heading">SaaS Platform</div>
        <div className="ml-auto space-x-4">
          <a href="#features" className="text-2xl hover:text-purple-500">Features</a>
          <a href="#pricing" className="text-2xl hover:text-purple-500">Pricing</a>
          <a href="#contact" className="text-2xl hover:text-purple-500">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
