import React, { useState } from 'react';
import ProfileDetails from '../components/Form/ProfileDetails';
import Education from '../components/Form/Education';
import WorkExperience from '../components/Form/WorkExperience';
import Projects from '../components/Form/Projects';

const Form = () => {

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
    
      const handleSubmit = () => {
        // Send formData to backend
        console.log(formData);
      };

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
    </div>
  );
};

export default Form;
