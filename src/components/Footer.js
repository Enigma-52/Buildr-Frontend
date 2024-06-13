import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SaaS Platform</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="https://twitter.com/myBuildr" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.instagram.com/my.buildr/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">About the Maker</h3>
            <p class="max-w-2xl mx-auto text-gray-400 mb-4">Rohit Singh is a budding developer from India with an interest in building SaaS products</p>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="https://twitter.com/enigmaticity" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="https://github.com/Enigma-52" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                  GitHub
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/rohitsingh52/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          SaaS Platform © 2024 All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
