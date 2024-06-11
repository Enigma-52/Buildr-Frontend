import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils"

const Username = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);
    const [username, setUsername] = useState('');
    const userId=user.uid;

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


      const handleInputChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handleSubmit = async () => {
        
            const id = user.uid;
            console.log(id);
            const response = await fetch('http://localhost:5000/api/buildrUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    username,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update username');
            }
            
            const data = await response.json();
            alert(`Your unique link is buildr-waitlist.vercel.app/${username}`);
            navigate('/form');
        };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter Your Buildr Username</h2>
        <div className="flex items-center mb-4">
          <div className="bg-gray-700 text-white rounded-l-lg px-5 py-2">
            <span className="text-xl" >buildr-waitlist.vercel.app/</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Type your username"
            className="px-2 text-xl py-2 bg-gray-700 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="pt-6">
        <button
          onClick={handleSubmit}
          className="text-xl w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Submit
        </button>
        </div>
        <div className="pt-6">
        <button
            onClick={handleLogout}
            className="text-xl w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300">
          
            Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Username;
