import "./DashboardLayout.css";
import { useState } from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {
  // const [darkMode, setDarkMode] = useState(() => {
  //   const savedMode = localStorage.getItem("darkMode");
  //   return savedMode ? JSON.parse(savedMode) : true;
  // });

  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux

  return (
    <>
      {/* <div className={`DashboardLayout ${darkMode ? "" : "dark-mode"}`}> */}
      <div className={`DashboardLayout ${theme === "dark" ? "dark-mode" : ""}`}>
        {/* <SidebarComponent darkMode={darkMode} setDarkMode={setDarkMode} /> */}
        <SidebarComponent />
        <main className="DashboardLayout__main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
