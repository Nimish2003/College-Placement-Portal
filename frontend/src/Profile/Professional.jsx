import React, { useState } from "react";
import Select from "../components/Select";
import axios from "axios"; // Import axios for HTTP requests
import "../Profile/Form.css";
import bg from "../images/college.jpeg";

export default function Professional() {
  const userdetails = JSON.parse(localStorage.getItem("user"));
  const email = userdetails.email;

  const [formData, setFormData] = useState({
    email,
    skills: [],
    internships: "",
    SEproject: { title: "", description: "", projectUrl: "" },
    TEproject: { title: "", description: "", projectUrl: "" },
    certifications: { title: "", description: "" },
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProjectChange = (projectType, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [projectType]: {
        ...prevData[projectType],
        [field]: value,
      },
    }));
  };

  const handleCertificationsChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      certifications: {
        ...prevData.certifications,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Skills:", formData);

    try {
      // Send POST request to your backend API to save formData
      const response = await fetch(
        "http://localhost:5000/api/form/professionals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response.data);
      // Reset form data after successful submission
      setFormData({
        skills: [],
        internships: "",
        SEproject: { title: "", description: "", projectUrl: "" },
        TEproject: { title: "", description: "", projectUrl: "" },
        certifications: { title: "", description: "" },
        resume: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-full py-4 px-5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
    >
      <div className="mx-auto my-4 max-w-2xl md:my-6">
        <div className="overflow-hidden bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-180 bg-gray-300 border border-opacity-10 border-gray-300 rounded-lg p-4 shadow px-9 py-3">
          <p className="text-sm font-bold text-gray-900">
            Professional Experience
          </p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <label
                className="text-sm mb-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="skills"
              >
                Skills
              </label>
              <Select
                name="skills"
                value={formData.skills}
                onChange={(selectedSkills) =>
                  setFormData({ ...formData, skills: selectedSkills })
                }
                placeholder="Select skills"
                options={[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "MongoDB",
                  "HTML",
                  "CSS",
                  // Add more skills as needed
                ]}
                isMulti
                className="form-input"
              />
            </div>

            <div className="col-span-2 grid">
              <label
                className="block text-sm mb-1 font-medium leading-none"
                htmlFor="internships"
              >
                Internships (if any)
              </label>
              <input
                type="text"
                id="internships"
                name="internships"
                value={formData.internships}
                onChange={handleChange}
                placeholder="Enter internship details"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="col-span-2">
              <p className="text-sm mb-2 font-bold text-gray-900">SE Project</p>
              <div className="grid gap-4">
                <div>
                  <label
                    className="block mb-1 text-sm font-medium leading-none"
                    htmlFor="SEtitle"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="SEtitle"
                    name="SEprojectTitle"
                    value={formData.SEproject.title}
                    onChange={(e) =>
                      handleProjectChange("SEproject", "title", e.target.value)
                    }
                    placeholder="Enter SE project title"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm mb-1 font-medium leading-none"
                    htmlFor="SEdescription"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="SEdescription"
                    name="SEprojectDescription"
                    value={formData.SEproject.description}
                    onChange={(e) =>
                      handleProjectChange(
                        "SEproject",
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter SE project description"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium leading-none"
                    htmlFor="SEprojectUrl"
                  >
                    Project URL
                  </label>
                  <input
                    type="text"
                    id="SEprojectUrl"
                    name="SEprojectUrl"
                    value={formData.SEproject.projectUrl}
                    onChange={(e) =>
                      handleProjectChange(
                        "SEproject",
                        "projectUrl",
                        e.target.value
                      )
                    }
                    placeholder="Enter SE project URL"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-sm mb-2 font-bold text-gray-900">TE Project</p>
              <div className="grid gap-4">
                <div>
                  <label
                    className="block mb-1 text-sm font-medium leading-none"
                    htmlFor="TEtitle"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="TEtitle"
                    name="TEprojectTitle"
                    value={formData.TEproject.title}
                    onChange={(e) =>
                      handleProjectChange("TEproject", "title", e.target.value)
                    }
                    placeholder="Enter TE project title"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium leading-none"
                    htmlFor="TEdescription"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="TEdescription"
                    name="TEprojectDescription"
                    value={formData.TEproject.description}
                    onChange={(e) =>
                      handleProjectChange(
                        "TEproject",
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter TE project description"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium leading-none"
                    htmlFor="TEprojectUrl"
                  >
                    Project URL
                  </label>
                  <input
                    type="text"
                    id="TEprojectUrl"
                    name="TEprojectUrl"
                    value={formData.TEproject.projectUrl}
                    onChange={(e) =>
                      handleProjectChange(
                        "TEproject",
                        "projectUrl",
                        e.target.value
                      )
                    }
                    placeholder="Enter TE project URL"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Certification section */}
            <div className="col-span-2 grid">
              <label
                className="block text-sm font-medium leading-none mb-1"
                htmlFor="certificationsTitle"
              >
                Certifications Title
              </label>
              <input
                type="text"
                id="certificationsTitle"
                name="certificationsTitle"
                value={formData.certifications.title}
                onChange={(e) =>
                  handleCertificationsChange("title", e.target.value)
                }
                placeholder="Enter certifications title"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="col-span-2 grid">
              <label
                className="block text-sm font-medium leading-none mb-1"
                htmlFor="certificationsDescription"
              >
                Certifications Description
              </label>
              <input
                type="text"
                id="certificationsDescription"
                name="certificationsDescription"
                value={formData.certifications.description}
                onChange={(e) =>
                  handleCertificationsChange("description", e.target.value)
                }
                placeholder="Enter certifications description"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="col-span-2 grid">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
