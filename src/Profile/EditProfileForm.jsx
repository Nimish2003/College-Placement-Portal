import React, { useState } from 'react';

const EditProfileForm = ({ initialValues, onSubmit }) => {
  const [formState, setFormState] = useState(initialValues);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
          Avatar
        </label>
        <input
          type="file"
          name="avatar"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="avatar"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"  // Set the type to "button" to prevent form submission
          onClick={() => onCancel()}  // Define onCancel function to handle cancel action
  >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
