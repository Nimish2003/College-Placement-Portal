import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';

const UserDetailsPage = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`/api/user-details/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error(error));
    }
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedUser({ ...user });
  };

  const handleSave = () => {
    axios.post(`/api/user-details/${userId}`, updatedUser)
      .then(response => {
        setUser(response.data);
        setEditing(false);
      })
      .catch(error => console.error(error));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <>
    <Sidebar />
    <div className="max-w-md absolute top-[150px] left-[700px] mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {editing ? (
        <div>
          <input type="text" name="name" value={updatedUser.name} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-2" />
          <input type="text" name="email" value={updatedUser.email} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-2" />
          <input type="text" name="contactNumber" value={updatedUser.contactNumber} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-2" />
          <input type="text" name="address" value={updatedUser.address} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-2" />
          <input type="date" name="dob" value={updatedUser.dob} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-2" />
          {/* Add input fields for other user details */}
          <button onClick={handleSave} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 mt-4">Save</button>
        </div>
      ) : (
        <div>
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Contact Number:</span> {user.contactNumber}</p>
          <p><span className="font-semibold">Address:</span> {user.address}</p>
          <p><span className="font-semibold">Date of Birth:</span> {user.dob}</p>
          {/* Display other user details */}
          <button onClick={handleEdit} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 mt-4">Edit</button>
        </div>
      )}
    </div>
    </>
  );
};

export default UserDetailsPage;
