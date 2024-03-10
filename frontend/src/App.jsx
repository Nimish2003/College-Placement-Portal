import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./Profile/Profile";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import RecruitmentProcess from "./pages/RecruitmentProcess";
import Internships from "./pages/Internships";
import Placement from "./pages/Placement";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import LocomotiveScroll from "locomotive-scroll";
import RecruiterProfileForm from "./pages/RecruiterProfileForm";
import Academic from "./Profile/Academic.jsx";
import Professional from "./Profile/Professional.jsx";

const locomotiveScroll = new LocomotiveScroll();

const App = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/recruitment-process" element={<RecruitmentProcess />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/placements" element={<Placement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiterform" element={<RecruiterProfileForm />} />
        <Route path="/profile/academic" element={<Academic />} />
        <Route path="/profile/professional" element={<Professional />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
