import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/signin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-gray-500 rounded-full mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">John Doe</h2>
            <p className="text-gray-400">San Francisco, CA</p>
            <p className="text-gray-400 mt-4 mb-4 text-center">Passionate developer with a love for building web applications.</p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-blue-400"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-blue-400"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-blue-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-blue-400"><i className="fab fa-github"></i></a>
            </div>
            <h3 className="text-xl font-semibold mb-4">GitHub Graph + Stats</h3>
            <div className="bg-blue-500 h-24 mb-4 w-full"></div>
            <h3 className="text-xl font-semibold mt-6 mb-4">Education</h3>
            <div className="bg-gray-700 p-4 mb-4 w-full rounded-lg">
              <p className="font-semibold">Stanford University</p>
              <p className="text-gray-400">B.S. Computer Science</p>
              <p className="text-gray-400">2015 - 2019</p>
            </div>
            <div className="bg-gray-700 p-4 w-full rounded-lg">
              <p className="font-semibold">Harvard University</p>
              <p className="text-gray-400">M.S. Software Engineering</p>
              <p className="text-gray-400">2020 - Present</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
              <h4 className="font-semibold text-xl mb-2">Project Alpha</h4>
              <p className="text-gray-400 mb-2">A web application for managing tasks.</p>
              <p className="text-blue-400 mb-2">example.com</p>
              <p className="text-gray-400">Revenue: $500 MRR / 100 users</p>
              <div className="text-center absolute right-4 top-4 flex flex-col space-y-2">
                <span className="inline-block bg-orange-500 text-gray-900 text-sm px-2 py-1 rounded">Building</span>
                <span className="inline-block bg-purple-500 text-gray-900 text-sm px-2 py-1 rounded">Web Application</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
              <h4 className="font-semibold text-xl mb-2">Project Alpha</h4>
              <p className="text-gray-400 mb-2">A web application for managing tasks.</p>
              <p className="text-blue-400 mb-2">example.com</p>
              <p className="text-gray-400">Revenue: $500 MRR / 100 users</p>
              <div className="text-center absolute right-4 top-4 flex flex-col space-y-2">
                <span className="inline-block bg-green-500 text-gray-900 text-sm px-2 py-1 rounded">Active</span>
                <span className="inline-block bg-red-500 text-gray-900 text-sm px-2 py-1 rounded">Machine Learning</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
              <h4 className="font-semibold text-xl mb-2">Project Alpha</h4>
              <p className="text-gray-400 mb-2">A web application for managing tasks.</p>
              <p className="text-blue-400 mb-2">example.com</p>
              <p className="text-gray-400">Revenue: $500 MRR / 100 users</p>
              <div className="text-center absolute right-4 top-4 flex flex-col space-y-2">
                <span className="inline-block bg-green-500 text-gray-900 text-sm px-2 py-1 rounded">Building</span>
                <span className="inline-block bg-purple-500 text-gray-900 text-sm px-2 py-1 rounded">Web Application</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Work Experience</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold text-xl mb-2">Google</p>
              <p className="text-gray-400 mb-2">Software Engineer</p>
              <p className="text-gray-400">2019 - Present</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold text-xl mb-2">Microsoft</p>
              <p className="text-gray-400 mb-2">Frontend Developer</p>
              <p className="text-gray-400">2017 - 2019</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-6">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-500 transition duration-300">
              Create Your Own Buildr Page Now!
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Dashboard;
