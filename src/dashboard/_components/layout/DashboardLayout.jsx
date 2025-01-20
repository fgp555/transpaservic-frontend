import "./DashboardLayout.css";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { useSelector } from "react-redux";
import "../style-global/renderPagination.css";

const DashboardLayout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux

  return (
    <div className={`DashboardLayout ${theme === "dark" ? "dark-mode" : ""}`}>
      <SidebarComponent />
      <main className="DashboardLayout__main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
