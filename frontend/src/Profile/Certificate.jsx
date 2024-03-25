import React, { useState } from "react";
import "../Profile/Form.css";

const Certificate = () => {
  const [certifications, setCertifications] = useState([
    {
      type: "Relevant Certifications",
      title: "",
      organization: "",
      date: "",
    },
    {
      type: "Professional Development Courses",
      title: "",
      organization: "",
      date: "",
    },
  ]);

  const handleCertificationInputChange = (index, e) => {
    const { name, value } = e.target;
    const newCertifications = [...certifications];
    newCertifications[index][name] = value;
    setCertifications(newCertifications);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        type: "",
        title: "",
        organization: "",
        date: "",
      },
    ]);
  };

  const removeCertification = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);
  };

  return (
    <div>
      {certifications.map((certification, index) => (
        <div key={index} className="col-span-2 grid gap-4">
          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`certificationType-${index}`}
            >
              Certification Type
            </label>
            <select
              id={`certificationType-${index}`}
              name="type"
              value={certification.type}
              onChange={(e) => handleCertificationInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            >
              <option value="Relevant Certifications">
                Relevant Certifications
              </option>
              <option value="Professional Development Courses">
                Professional Development Courses
              </option>
            </select>
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`certificationTitle-${index}`}
            >
              Certification Title
            </label>
            <input
              id={`certificationTitle-${index}`}
              name="title"
              value={certification.title}
              onChange={(e) => handleCertificationInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`certificationOrganization-${index}`}
            >
              Certification Organization
            </label>
            <input
              id={`certificationOrganization-${index}`}
              name="organization"
              value={certification.organization}
              onChange={(e) => handleCertificationInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium leading-none text-gray-700"
              htmlFor={`certificationDate-${index}`}
            >
              Certification Date
            </label>
            <input
              id={`certificationDate-${index}`}
              name="date"
              type="date"
              value={certification.date}
              onChange={(e) => handleCertificationInputChange(index, e)}
              className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
            />
          </div>

          <button
            onClick={() => removeCertification(index)}
            className="w-full h-10 px-3 mt-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Remove Certification
          </button>
        </div>
      ))}
      <button
        onClick={addCertification}
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add Certification
      </button>
    </div>
  );
};

export default Certificate;
