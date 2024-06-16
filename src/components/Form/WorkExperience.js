import React, { useState, useEffect } from 'react';

const WorkExperience = ({ formData, onWorkExperienceChange }) => {
  const [workExperiences, setWorkExperiences] = useState(formData || []);
  const [workInput, setWorkInput] = useState({
    company: '',
    role: '',
    startYear: '',
    endYear: '',
  });

  useEffect(() => {
    setWorkExperiences(formData || []);
  }, [formData]);

  const addWorkExperience = () => {
    const currentYear = new Date().getFullYear().toString();
    const newWorkExperience = {
      ...workInput,
      endYear: workInput.endYear ? workInput.endYear : currentYear,
    };

    if (workInput.company.trim() !== '') {
      const updatedWorkExperiences = [...workExperiences, newWorkExperience];
      setWorkExperiences(updatedWorkExperiences);
      setWorkInput({ company: '', role: '', startYear: '', endYear: '' });
      onWorkExperienceChange(updatedWorkExperiences); // Send updated work experiences to parent
    }
  };

  const removeWorkExperience = (index) => {
    const updatedWorkExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedWorkExperiences);
    onWorkExperienceChange(updatedWorkExperiences); // Send updated work experiences to parent
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkInput({ ...workInput, [name]: value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl mb-4">Work Experience</h2>
      <form>
        <div className="mb-2">
          <label className="block mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={workInput.company}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={workInput.role}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Start Year</label>
          <input
            type="text"
            name="startYear"
            value={workInput.startYear}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">End Year (Leave empty if still working here)</label>
          <input
            type="text"
            name="endYear"
            value={workInput.endYear}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <button
          type="button"
          onClick={addWorkExperience}
          className="w-full bg-green-600 p-2 rounded-md"
        >
          Add Work Experience
        </button>
      </form>

      <div className="mt-4">
        {workExperiences.map((work, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded-md mb-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg">{work.company}</h3>
              <p>{work.role}</p>
              <p>{work.startYear} - {work.endYear === new Date().getFullYear().toString() ? "Present" : work.endYear}</p>
            </div>
            <button
              onClick={() => removeWorkExperience(index)}
              className="bg-red-600 p-2 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
