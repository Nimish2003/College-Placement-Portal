import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Profile from "./Profile/Profile.jsx";
import Layout from "./components/Layout.jsx";
import Footer from "./components/Footer.jsx";
import Internships from "./pages/Internships.jsx";
import Placement from "./pages/Placement.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import LocomotiveScroll from "locomotive-scroll";
import RecruiterProfileForm from "./pages/RecruiterProfileForm.jsx";
import Academic from "./Profile/Academic.jsx";
import Professional from "./Profile/Professional.jsx";
import CompanyProfile from "./Profile/CompanyProfile.jsx";
import JobPostingForm from "./pages/JobCreateForm.jsx";
import Redirect from "./Redirect.jsx";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home.jsx";
import RecruitmentProcess from "./pages/RecruitmentProcess.jsx";

const locomotiveScroll = new LocomotiveScroll();

function App() {
  const token = localStorage.getItem('token');

  const isNavBarOpen = useSelector(state => state.ui.isNavBarOpen)

  const router = createBrowserRouter([
    {
      
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/contactus',
          element: <ContactUs />
        },
        {
          path: '/internships',
          element: <Internships />
        },
        {
          path: '/placements',
          element: <Placement />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/recruiterform',
          element: <RecruiterProfileForm />
        },
        {
          path: '/companyprofile',
          element: <CompanyProfile />
        },
        {
          path:"/academic",
          element:<Academic />
        },
        {
          path:"/professional",
          element: <Professional />
        },
        {
          path: "/create-job",
          element: <JobPostingForm />,
        },
        {
          path: '/recruitmentprocess',
          element: <RecruitmentProcess />
        }
        
      ]
    }
  ]);

  return (
      <Layout>

    <AnimatePresence >
      <div className="h-full w-full bg-[#E6E6FA]">
        <RouterProvider router={router} />
      </div>
    </AnimatePresence>
      </Layout>
  )
}

export default App