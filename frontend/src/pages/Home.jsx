import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Layout from "../components/Layout";
import Sidebar from "../components/SideBar";
import CoverPhoto from "../images/rgit2.jpg";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Testimonial from "../components/Testimonial";
import AboutCell from "../components/AboutCell";
import AboutPrincipal from "../components/AboutPrincipal";
import DrawOutlineButton from "../components/DrawOutlineButton"
const Home = () => {

  return (
    <>
      <div>
        <div id="Home" className="relative  bg-white">
          <div className="w-full  ">
            <div className=" h-2/3  ">
              <div className="flex">
                <img
                  className=" w-full object-cover opacity-95 contrast-125"
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-direction="horizontal"
                  src={CoverPhoto}
                  alt="Cover Page"
                />
                <div className="absolute top-6  mx-6 text-gray-50 bg-slate-800 w-2/3  bg-opacity-60 rounded-xl  ">
                <h1 className="p-5 font-extrabold text-5xl">A one stop portal for Placements & Internships</h1>
                <p className="p-5 font-sans text-xl font-semibold"><span>Welcome to the recruitment website For Rajiv Gandhi Institute of technology.</span> <br></br> RGIT is dedicated to fostering innovation, creativity, and technological advancement among its students. With a focus on practical learning and industry collaboration, our graduates emerge as skilled professionals ready to tackle real-world challenges. Join us at RGIT and embark on a journey of academic excellence and career success...</p>
                </div>
              </div>
           
              <div className="absolute top-20 end-40">
              {/* <div className=" bg-slate-900 "> */}
              <DrawOutlineButton>  <PersonOutlineIcon></PersonOutlineIcon>  Student</DrawOutlineButton>
              </div>
              <div className="absolute top-40 end-40">
              {/* <div className=" bg-slate-900 "> */}
              <DrawOutlineButton>  <PersonOutlineIcon></PersonOutlineIcon>  Admin</DrawOutlineButton>
              </div>
              <div className=" text-5xl font-bold mt-5 bg-slate-200 shadow-sm h-20 flex p-3 justify-center">Placement and Training Cell</div>
              <AboutCell />
              <Testimonial />
              <AboutPrincipal />
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Home;
