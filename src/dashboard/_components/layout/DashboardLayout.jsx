import React from "react";
import "./DashboardLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  // const isLogin = useSelector((state) => state.user.login);
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
