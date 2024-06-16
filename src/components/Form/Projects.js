import React, { useState , useEffect } from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ formData , onProjectsChange }) => {
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState({
    name: '',
    description: '',
    url: '',
    revenueUsers: '',
    status: 'Building',
    category: 'Web Application',
  });

  useEffect(() => {
    setProjects(formData || []);
  }, [formData]);

  const addProject = () => {
    if (projectInput.name.trim() !== '') {
      const newProject = { ...projectInput };
      setProjects([...projects, newProject]);
      setProjectInput({ name: '', description: '', url: '', revenueUsers: '', status: 'Building', category: 'Web Application' });
      onProjectsChange([...projects, newProject]); // Send updated projects to parent
      console.log('Updated projects:', [...projects, newProject]); // Log updated projects
    }
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    onProjectsChange(updatedProjects); // Send updated projects to parent
    console.log('Updated projects:', updatedProjects); // Log updated projects
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInput({ ...projectInput, [name]: value });
  };

  // Add a temporary console.log to ensure component rendering
  console.log('Projects Component Rendered. Projects:', projects);

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl mb-4">Projects</h2>
      <form>
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={projectInput.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={projectInput.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">URL</label>
          <input
            type="text"
            name="url"
            value={projectInput.url}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Revenue/Users</label>
          <span className="text-s text-gray-500">Example: $50 MRR / 25 users</span>
          <input
            type="text"
            name="revenueUsers"
            value={projectInput.revenueUsers}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={projectInput.status}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          >
            <option value="Building">Building</option>
            <option value="Active">Active</option>
            <option value="Discontinued">Discontinued</option>
            <option value="On hold">On hold</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={projectInput.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
          >
            <option value="Web Application">Web Application</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="w-full bg-green-600 p-2 rounded-md"
        >
          Add Project
        </button>
      </form>

      <div className="mt-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} removeProject={removeProject} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
