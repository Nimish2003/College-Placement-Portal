import React from "react";
import Sidebar from "./SideBar";
import { EditProfileForm } from "./EditProfileForm";
import { AcademicDetails } from "./AcademicDetails";

const Profile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <EditProfileForm />
      <AcademicDetails />
    </div>
  );
};

export default Profile;
