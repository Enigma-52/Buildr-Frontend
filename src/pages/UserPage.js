import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';

const Modal = ({  onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-black bg-opacity-75 absolute inset-0" onClick={onClose}></div>
    <div className="relative bg-gray-900 p-10 rounded shadow-lg text-black z-10 max-w-lg mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-red-500">Payment Required!</h2>
      <p className="text-center text-white text-lg mb-8">Please Visit Buildr to complete your payment</p>
      <div className="flex justify-center">
        <a 
          href="http://localhost:3000/" 
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Complete Payment
        </a>
      </div>
    </div>
  </div>
);


const UserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setUserData(data);

        if (data.paid === "false") {
          setShowModal(true);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  
  const selectLastHalfYear = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;
  
    return contributions.filter(activity => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
  
      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Building':
        return 'bg-yellow-500';
      case 'Active':
        return 'bg-green-500';
      case 'Discontinued':
        return 'bg-red-500';
      case 'On hold':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Web Application':
        return 'bg-blue-500';
      case 'Mobile Application':
        return 'bg-purple-500';
      case 'Data Science':
        return 'bg-indigo-500';
      case 'Machine Learning':
        return 'bg-teal-500';
      case 'Artificial Intelligence':
        return 'bg-pink-500';
      case 'Blockchain':
        return 'bg-yellow-600';
      case 'Cybersecurity':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <img src={userData.profilePictureUrl} alt="Profile" className="w-32 h-32 bg-gray-500 rounded-full mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{userData.displayName}</h2>
            <p className="text-gray-400">{userData.location}</p>
            <p className="text-gray-400 mt-2 mb-2 text-center">{userData.personalInfo.bio}</p>
            <p className="text-gray-400 pb-2"><i class="fa-solid fa-envelope"></i> { userData.personalInfo.email}</p>
            <div className="flex space-x-4 mb-6">
              {userData.socialLinks.github && (
                <a 
                  href={`https://github.com/${userData.socialLinks.github}`} 
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
              {userData.socialLinks.leetcode && (
                <a 
                  href={`https://leetcode.com/u/${userData.socialLinks.leetcode}`} 
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Leetcode Profile"
                >
                  <i className="fa-solid fa-code"></i>
                </a>
              )}
              {userData.socialLinks.linkedin && (
                <a 
                  href={userData.socialLinks.linkedin} 
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {userData.socialLinks.twitter && (
                <a 
                  href={userData.socialLinks.twitter} 
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-4">GitHub Graph + Stats</h3>
              <GitHubCalendar 
              username={userData.socialLinks.github} 
              transformData={selectLastHalfYear} 
              hideColorLegend
              labels={{
                totalCount: '{{count}} contributions in the last half year',
              }}
               />
            <h3 className="text-xl font-semibold mt-6 mb-4">Education</h3>
              {userData.education.map((edu, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 p-4 mb-4 w-full rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600"
                >
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-gray-400">{edu.degree}</p>
                  <p className="text-gray-400">{edu.startYear} - {edu.endYear || 'Present'}</p>
                </div>
              ))}
            </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userData.projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-4 rounded-lg mb-4 relative transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700"
              >
                <h4 className="font-semibold text-xl mb-2">{project.name}</h4>
                <p className="text-gray-400 mb-2">{project.description}</p>
                <a 
                  href={project.url} 
                  className="text-blue-400 mb-2 block hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {project.url}
                </a>
                <p className="text-gray-400 mb-2">Revenue/Users: {project.revenueUsers}</p>
                <div className="text-center grid grid-cols-2 gap-2 absolute right-4 top-4">
                  <span className={`${getStatusClass(project.status)} text-gray-900 text-sm px-2 py-1 rounded`}>{project.status}</span>
                  <span className={`${getCategoryClass(project.category)} text-gray-900 text-sm px-2 py-1 rounded`}>{project.category}</span>
                </div>
              </div>
            ))}
          </div>


          <h3 className="text-2xl font-semibold mt-8 mb-4">Work Experience</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {userData.workExperience.map((exp, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 p-4 rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700"
                >
                  <p className="font-semibold text-xl mb-2">{exp.company}</p>
                  <p className="text-gray-400 mb-2">{exp.role}</p>
                  <p className="text-gray-400">{exp.startYear} - {exp.endYear || 'Present'}</p>
                </div>
              ))}
            </div>
          <div className="text-center mt-8 pt-6">
          <a href="http://localhost:3000/" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-500 transition duration-300">
            Create Your Own Buildr Page Now!
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
