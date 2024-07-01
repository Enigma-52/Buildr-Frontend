import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MSP from '../components/MSP';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import img from '../assets/images/img2.jpeg';

function Home() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <MSP />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home;
