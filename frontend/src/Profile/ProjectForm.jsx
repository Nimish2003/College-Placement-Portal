import React, { useState } from "react";

const ProjectForm = () => {
  const [projects, setProjects] = useState([
    {
      type: 'Academic',
      title: '',
      description: '',
      technologiesUsed: '',
      outcome: ''
    },
    {
      type: 'Personal',
      title: '',
      description: '',
      technologiesUsed: '',
      outcome: ''
    }
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, {
      type: '',
      title: '',
      description: '',
      technologiesUsed: '',
      outcome: ''
    }]);
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="col-span-2 grid gap-4">
          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`type-${index}`}
            >
              Project Type
            </label>
            <select
              id={`type-${index}`}
              name="type"
              value={project.type}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            >
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`title-${index}`}
            >
              Title
            </label>
            <input
              id={`title-${index}`}
              name="title"
              value={project.title}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`description-${index}`}
            >
              Description
            </label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={project.description}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full h-20 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`technologiesUsed-${index}`}
            >
              Technologies Used
            </label>
            <input
              id={`technologiesUsed-${index}`}
              name="technologiesUsed"
              value={project.technologiesUsed}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`outcome-${index}`}
            >
              Outcome
            </label>
            <textarea
              id={`outcome-${index}`}
              name="outcome"
              value={project.outcome}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full h-20 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <button
            onClick={() => removeProject(index)}
            className="w-full h-10 px-3 mt-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Remove Project
          </button>
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add Project
      </button>
    </div>
  );
};

export default ProjectForm;
