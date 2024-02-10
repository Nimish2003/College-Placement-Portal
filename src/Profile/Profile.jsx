import React from 'react';
import Footer from '../components/Footer';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Sidebar from './SideBar';

const Profile = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-10">
        <ResponsiveAppBar />
        {/* Additional profile content goes here */}
        <EditProfileForm />
        {/* Additional profile content goes here */}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;

