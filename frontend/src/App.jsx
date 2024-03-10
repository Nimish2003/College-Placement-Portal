import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./Profile/Profile.jsx";
import Layout from "./components/Layout.jsx";
import Footer from "./components/Footer.jsx";
import RecruitmentProcess from "./pages/RecruitmentProcess.jsx";
import Internships from "./pages/Internships.jsx";
import Placement from "./pages/Placement.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import LocomotiveScroll from "locomotive-scroll";
import RecruiterProfileForm from "./pages/RecruiterProfileForm.jsx";
import Academic from "./Profile/Academic.jsx";
import Professional from "./Profile/Professional.jsx";
import CompanyProfile from "./Profile/CompanyProfile.jsx";

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
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/profile/academic" element={<Academic />} />
        <Route path="/profile/professional" element={<Professional />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
