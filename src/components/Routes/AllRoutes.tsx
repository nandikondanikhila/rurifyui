import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import UserLogin from "../User/UserLogin";
import UserRegistration from "../User/UserRegistration";
import AdminLogin from "../Admin/AdminLogin";
import Dashboard from "../Admin/Dashboard";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../PrivateRoute/UserPrivateRoute";
import Issues from "../User/Issues";
import Rewards from "../User/Rewards";
import ApproveIssues from "../Admin/IssuesApprove";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={<AdminPrivateRoute child={<Dashboard />} />}
        />
        <Route
          path="/dashboard/issues"
          element={<AdminPrivateRoute child={<ApproveIssues />} />}
        />
        <Route
          path="/issues"
          element={<UserPrivateRoute child={<Issues />} />}
        />{" "}
        <Route
          path="/rewards"
          element={<UserPrivateRoute child={<Rewards />} />}
        />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
