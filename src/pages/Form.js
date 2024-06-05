import React from 'react';
import ProfileDetails from '../components/Form/ProfileDetails';
import Education from '../components/Form/Education';
import WorkExperience from '../components/Form/WorkExperience';
import Projects from '../components/Form/Projects';

const Form = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="w-full max-w-6xl flex space-x-8">
        <div className="w-1/3 space-y-4">
          <ProfileDetails />
        </div>
        <div className="w-2/3 space-y-4">
          <Education />
          <WorkExperience />
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default Form;
