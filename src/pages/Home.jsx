import React from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/SideBar";
import CoverPhoto from "../images/rgit.jpg"
const Home = () => {
  return (
    <>
      <div className="flex">
        
        <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
        <div className="rounded-lg bg-gray-200 p-4">
          <img
            className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[400px]"
            src={CoverPhoto}
            alt="Cover Page"
          />
        </div>
          
          <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2">
          
          </div>
          <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
Placement Cell
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-gray-700">
          RGIT Training & Placement Cell aims at building a strong interface between industry and the University for training and placement of students. To make recruitment session smoother for students, Training & Placement Cell has a web portal for handling the placement registration for companies visiting our campus.
          </p>
          <div className="mt-8">
           
          </div>
        </div>
        
      </div>
    </div>
      </div>
    </>
  );
};

export default Home;

