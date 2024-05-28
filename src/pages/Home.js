import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MSP from '../components/MSP';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';


function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <MSP />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home;
