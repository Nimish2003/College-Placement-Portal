import React from "react";
import Sidebar from "./SideBar";
import { EditProfileForm } from "./EditProfileForm";

const Profile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <EditProfileForm />
    </div>
  );
};

export default Profile;
