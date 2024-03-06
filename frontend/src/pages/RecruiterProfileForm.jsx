import React, { useState } from "react";

const RecruiterProfileForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    location: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    mission: "",
    values: "",
    culture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            autoComplete="off"
            required
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <input
            type="text"
            name="industry"
            id="industry"
            autoComplete="off"
            required
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            Size
          </label>
          <input
            type="text"
            name="size"
            id="size"
            autoComplete="off"
            required
            value={formData.size}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            autoComplete="off"
            required
            value={formData.location}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="contactPerson"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Person
          </label>
          <input
            type="text"
            name="contactPerson"
            id="contactPerson"
            autoComplete="off"
            required
            value={formData.contactPerson}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            autoComplete="off"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="mission"
            className="block text-sm font-medium text-gray-700"
          >
            Mission
          </label>
          <textarea
            name="mission"
            id="mission"
            autoComplete="off"
            required
            value={formData.mission}
            onChange={handleChange}
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="values"
            className="block text-sm font-medium text-gray-700"
          >
            Values
          </label>
          <textarea
            name="values"
            id="values"
            autoComplete="off"
            required
            value={formData.values}
            onChange={handleChange}
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="culture"
            className="block text-sm font-medium text-gray-700"
          >
            Culture
          </label>
          <textarea
            name="culture"
            id="culture"
            autoComplete="off"
            required
            value={formData.culture}
            onChange={handleChange}
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfileForm;

