import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Company from "./Company";

const Admin = () => {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <Switch>
          <Route path="/company-details">
            <Company />
          </Route>
          {/* Define other routes here */}
        </Switch>
      </div>
    </Router>
  );
};

export default Admin;
