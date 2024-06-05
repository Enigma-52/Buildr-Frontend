import React from 'react';

const ProjectCard = ({ project, index, removeProject }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <h3 className="text-xl mb-2">{project.name}</h3>
      <p className="mb-2">{project.description}</p>
      <a href={project.url} className="text-blue-400">{project.url}</a>
      <div className="mt-2">
        <span className="bg-gray-600 p-1 rounded-md mr-2">{project.revenueUsers}</span>
        <span className="bg-gray-600 p-1 rounded-md mr-2">{project.status}</span>
        <span className="bg-gray-600 p-1 rounded-md">{project.category}</span>
      </div>
      <button
        onClick={() => removeProject(index)}
        className="mt-4 bg-red-600 p-2 rounded-md"
      >
        Remove
      </button>
    </div>
  );
};

export default ProjectCard;
