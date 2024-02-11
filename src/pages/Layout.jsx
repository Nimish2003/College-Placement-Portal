import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import Placement from "./Placement";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Placement />
    </div>
  );
};

export default Layout;
