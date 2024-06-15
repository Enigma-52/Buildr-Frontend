import React, { useState } from 'react';

const WorkExperience = ({ onWorkExperienceChange }) => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [workInput, setWorkInput] = useState({
    company: '',
    role: '',
    startYear: '',
    endYear: '',
  });

  const addWorkExperience = () => {
    if (workInput.company.trim() !== '') {
      const newWorkExperience = { ...workInput };
      setWorkExperiences([...workExperiences, newWorkExperience]);
      setWorkInput({ company: '', role: '', startYear: '', endYear: '' });
      onWorkExperienceChange([...workExperiences, newWorkExperience]); // Send updated work experiences to parent
      console.log('Updated work experiences:', [...workExperiences, newWorkExperience]); // Log updated work experiences
    }
  };

  const removeWorkExperience = (index) => {
    const updatedWorkExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedWorkExperiences);
    onWorkExperienceChange(updatedWorkExperiences); // Send updated work experiences to parent
    console.log('Updated work experiences:', updatedWorkExperiences); // Log updated work experiences
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkInput({ ...workInput, [name]: value });
  };

  // Add a temporary console.log to ensure component rendering
  console.log('WorkExperience Component Rendered. Work Experiences:', workExperiences);

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
          <label className="block mb-1">End Year ( Leave empty if still working here )</label>
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
              <p>{work.startYear} - {work.endYear}</p>
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
