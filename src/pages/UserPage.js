import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';

const UserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <img src={userData.profilePictureUrl} alt="Profile" className="w-32 h-32 bg-gray-500 rounded-full mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{userData.displayName}</h2>
            <p className="text-gray-400">{userData.location}</p>
            <p className="text-gray-400 mt-4 mb-4 text-center">{userData.personalInfo.bio}</p>
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
              {userData.socialLinks.github && (
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
              <div key={index} className="bg-gray-700 p-4 mb-4 w-full rounded-lg">
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
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 relative">
                  <h4 className="font-semibold text-xl mb-2">{project.name}</h4>
                  <p className="text-gray-400 mb-2">{project.description}</p>
                  <p className="text-blue-400 mb-2">{project.url}</p>
                  <p className="text-gray-400 mb-2">Revenue/Users: {project.revenueUsers}</p>
                  <div className="text-center grid grid-cols-2 gap-2 absolute right-4 top-4">
                    <span className="bg-green-500 text-gray-900 text-sm px-2 py-1 rounded">{project.status}</span>
                    <span className="bg-purple-500 text-gray-900 text-sm px-2 py-1 rounded">{project.category}</span>
                  </div>
                </div>
              ))}
            </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Work Experience</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userData.workExperience.map((exp, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
                <p className="font-semibold text-xl mb-2">{exp.company}</p>
                <p className="text-gray-400 mb-2">{exp.role}</p>
                <p className="text-gray-400">{exp.startYear} - {exp.endYear || 'Present'}</p>
              </div>
            ))}
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

export default UserPage;
