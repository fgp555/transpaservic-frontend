import React from "react";
import DashboardAdminPage from "./DashboardAdminPage";
import { useSelector } from "react-redux";
import DashboardUserPage from "./DashboardUserPage";

const DashboardPage = () => {
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");

  return (
    <>
      {isAdmin ? <DashboardAdminPage /> : <DashboardUserPage />}
    </>
  );
};

export default DashboardPage;
