import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Company from './Company';
import ViewDrive from './ViewDrive';
import ViewStudents from './ViewStudents';

const Admin = () => {
  return (
    <div>
      < Navbar/>
      <div className='flex'>
      <Sidebar />
      <ViewStudents />
      </div>
    </div>
  );
}

export default Admin;
