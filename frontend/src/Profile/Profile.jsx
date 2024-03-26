import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth");
      setData(response.data);
      console.log(data);
    } catch (error) {
      res.status(401).json("Error while fetching");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <EditProfileForm />
    </div>
  );
};

export default Profile;
