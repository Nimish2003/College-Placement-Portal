import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import RecruitmentProcess from "./pages/RecruitmentProcess.jsx";
import Navbar from "./components/Navbar.jsx";
import Cookies from "js-cookie";
import Admin from "./components/Admin/Admin.jsx";
import UserDetailsPage from "./Profile/UserDetailsPage.jsx";
import Company from "./components/Admin/Company.jsx";

function App() {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const role = currentUser ? currentUser.role : null;

  const isNavBarOpen = useSelector((state) => state.ui.isNavBarOpen);

  // Create separate router configurations for student and admin
  const studentRoutes = [
    {
      path: "/",
      element: (
        <>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={2}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
          {!role || role !== "admin" ? <Navbar /> : null} {/* Render Navbar only if the role is not admin */}
          {!isNavBarOpen && (
            <>
              <Outlet />
              {token && <Footer />}
            </>
          )}
        </>
      ),
      children: [
        {
          path: "/",
          element: <Redirect />,
        },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/internships",
          element: <Internships />,
        },
        {
          path: "/placements",
          element: <Placement />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/recruiterform",
          element: <RecruiterProfileForm />,
        },
        {
          path: "/companyprofile",
          element: <CompanyProfile />,
        },
        {
          path: "/academic",
          element: <Academic />,
        },
        {
          path: "/professional",
          element: <Professional />,
        },
        {
          path: "/create-job",
          element: <JobPostingForm />,
        },
        {
          path: "/recruitmentprocess",
          element: <RecruitmentProcess />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ];

  const adminRoutes = [
    {
      path: "/",
      element: (
        <>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={2}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
          {!isNavBarOpen && (
            <>
              <Outlet />
              {token && <Footer />}
            </>
          )}
        </>
      ),
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/company",
          element: <Company />,
        },
      ],
    },
  ];

  // Choose the routes based on the user's role
  const routes = role === "admin" ? adminRoutes : studentRoutes;

  const router = createBrowserRouter(routes);

  return (
    <AnimatePresence>
      <div className="h-full w-full bg-[#E6E6FA]">
        <RouterProvider router={router} />
      </div>
    </AnimatePresence>
  );
}

export default App;

