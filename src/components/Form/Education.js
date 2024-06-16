import React, { useState , useEffect } from 'react';

const Education = ({ formData, onEducationChange }) => {
  console.log("Education data");
  
  const [educations, setEducations] = useState(formData || []);
  const [educationInput, setEducationInput] = useState({
    institution: '',
    degree: '',
    startYear: '',
    endYear: '',
  });

  useEffect(() => {
    setEducations(formData || []);
  }, [formData]);

  const addEducation = () => {
    const currentYear = new Date().getFullYear().toString();
    const newEducation = {
      ...educationInput,
      endYear: educationInput.endYear ? educationInput.endYear : currentYear,
    };

    if (educationInput.institution.trim() !== '') {
      const updatedEducations = [...educations, newEducation];
      setEducations(updatedEducations);
      setEducationInput({ institution: '', degree: '', startYear: '', endYear: '' });
      onEducationChange(updatedEducations); 
      console.log("hello");
      console.log('Updated educations:', updatedEducations); // Log the updated educations
    }
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
    onEducationChange(updatedEducations); // Update parent component state
    console.log('Updated educations:', updatedEducations); // Log the updated educations
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationInput({ ...educationInput, [name]: value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl mb-4">Education</h2>
      <form>
        <div className="mb-2">
          <label className="block mb-1">Institution</label>
          <input
            type="text"
            name="institution"
            value={educationInput.institution}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            value={educationInput.degree}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Start Year</label>
          <input
            type="text"
            name="startYear"
            value={educationInput.startYear}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">End Year (Leave empty if still studying)</label>
          <input
            type="text"
            name="endYear"
            value={educationInput.endYear}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="w-full bg-green-600 p-2 rounded-md"
        >
          Add Education
        </button>
      </form>

      <div className="mt-4">
        {educations.map((education, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded-md mb-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg">{education.institution}</h3>
              <p>{education.degree}</p>
              <p>{education.startYear} - {education.endYear === new Date().getFullYear().toString() ? "Present" : education.endYear}</p>
            </div>
            <button
              onClick={() => removeEducation(index)}
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

export default Education;
