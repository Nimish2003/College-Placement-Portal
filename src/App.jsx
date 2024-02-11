import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './Profile/Profile'
import Layout from './components/Layout'
import Footer from './components/Footer'


const App = () => {
  return (
    <div>
      <Layout />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
