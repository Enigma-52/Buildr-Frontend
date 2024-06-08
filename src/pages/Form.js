import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";
import ProfileDetails from '../components/Form/ProfileDetails';
import Education from '../components/Form/Education';
import WorkExperience from '../components/Form/WorkExperience';
import Projects from '../components/Form/Projects';
import axios from 'axios';

const Form = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      bio: '',
      email: '',
      location: '',
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      other: '',
      leetcode: ''
    },
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleSocialLinkChange = (e, platform) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      socialLinks: {
        ...prevState.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      userId: user.uid,
      personalInfo: formData.personalInfo,
      socialLinks: formData.socialLinks
    };

    try {
      const response = await axios.post('http://localhost:5000/api/submitProfileDetails', payload);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error submitting profile details:', error);
    }
  };

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
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Create your Buildr Profile</h1>
      <div className="w-full max-w-6xl flex space-x-8">
        <div className="w-1/3 space-y-4">
        <ProfileDetails 
            formData={formData.personalInfo} 
            onChange={handlePersonalInfoChange}
            onSocialLinkChange={handleSocialLinkChange}
          />
          <Education />
        </div>
        <div className="w-2/3 space-y-4">
          <WorkExperience />
          <Projects />
        </div>
      </div>
      <div class="py-3">
      <button class="bg-red-600 p-2 rounded-md py-2" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
    </div>
  );
};

export default Form;
