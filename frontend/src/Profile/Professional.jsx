import React, { useState } from "react";
import Api from "../api";
import { toast } from "react-toastify";

export default function Professional() {
  const userdetails = JSON.parse(localStorage.getItem("user"));
  const email = userdetails.email;

  const [formData, setFormData] = useState({
    email,
    internship: "",
    projects: [
      { title: "", description: "", projectUrl: "" },
      { title: "", description: "", projectUrl: "" },
    ],
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInternshipChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      internship: value,
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.createProfessional(formData);
      console.log(res);
      toast.success("Details saved successfully!!");
      setFormData({
        email,
        internship: "",
        projects: [
          { title: "", description: "", projectUrl: "" },
          { title: "", description: "", projectUrl: "" },
        ],
        course: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-full py-4 px-5 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <form onSubmit={handleSubmit} className="mx-auto my-4 max-w-2xl md:my-6">
        <div className="overflow-hidden bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-180 bg-gray-300 border border-opacity-10 border-gray-300 rounded-lg p-4 shadow px-9 py-3">
          <p className="text-sm font-bold text-gray-900">Professional Experience</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <label className="block text-sm mb-1 font-medium leading-none" htmlFor="internshipTitle">
                Internship Name
              </label>
              <input
                type="text"
                id="internshipTitle"
                name="internshipTitle"
                value={formData.internship}
                onChange={(e) => handleInternshipChange(e.target.value)}
                placeholder="Enter internship name"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {formData.projects.map((project, index) => (
              <div className="col-span-2" key={index}>
                <p className="text-sm mb-2 font-bold text-gray-900">
                  {index === 0 ? "SE Project" : index === 1 ? "TE Project" : `Project ${index + 1}`}
                </p>
                <div className="grid gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium leading-none" htmlFor={`projectTitle-${index}`}>
                      Title
                    </label>
                    <input
                      type="text"
                      id={`projectTitle-${index}`}
                      name={`projectTitle-${index}`}
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                      placeholder={`Enter Project ${index + 1} title`}
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium leading-none" htmlFor={`projectDescription-${index}`}>
                      Description
                    </label>
                    <input
                      type="text"
                      id={`projectDescription-${index}`}
                      name={`projectDescription-${index}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                      placeholder={`Enter Project ${index + 1} description`}
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium leading-none" htmlFor={`projectUrl-${index}`}>
                      Project URL (if any)
                    </label>
                    <input
                      type="text"
                      id={`projectUrl-${index}`}
                      name={`projectUrl-${index}`}
                      value={project.projectUrl}
                      onChange={(e) => handleProjectChange(index, "projectUrl", e.target.value)}
                      placeholder={`Enter Project ${index + 1} URL`}
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-span-2 grid">
              <label className="block text-sm font-medium leading-none mb-1" htmlFor="course">
                Course Name
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course name"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="col-span-2 grid">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
