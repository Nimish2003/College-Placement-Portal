import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './Profile/Profile'
import Layout from './components/Layout'
import Footer from './components/Footer'
import RecruitmentProcess from "./pages/RecruitmentProcess";
import Internships from "./pages/Internships";
import Placement from "./pages/Placement";
import  ContactUs from "./pages/ContactUs"


const App = () => {
  return (
    <div>
      <Layout />
      <Profile />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/contactus" element={<ContactUs/>}></Route>
        <Route path="/recruitment process" element={<RecruitmentProcess/>}></Route>
        <Route path="/internships" element={<Internships/>}></Route>
        <Route path="/placements" element={<Placement/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
