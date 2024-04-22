import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Company from './Company';
import ViewDrive from './ViewDrive';

const Admin = () => {
  return (
    <div>
      < Navbar/>
      <div className='flex'>
      <Sidebar />
      <ViewDrive />
      </div>
    </div>
  );
}

export default Admin;
