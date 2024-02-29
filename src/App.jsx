import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './Profile/Profile'
import Layout from './components/Layout'
import Footer from './components/Footer'
import RecruitmentProcess from "./pages/RecruitmentProcess";
import Internships from "./pages/Internships";
import Placement from "./pages/Placement";
import ContactUs from "./pages/ContactUs"
import Sidebar from "./components/SideBar";
import Login from "./pages/Login";
import LocomotiveScroll from 'locomotive-scroll';

const locomotiveScroll = new LocomotiveScroll();


const App = () => {
  
  return (
    <>
   <Layout/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/recruitment-process" element={<RecruitmentProcess />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/placements" element={<Placement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </>
  );
};

export default App;
