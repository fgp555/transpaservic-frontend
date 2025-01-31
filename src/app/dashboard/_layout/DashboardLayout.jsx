import "./DashboardLayout.css";
import SidebarComponent from "../_components/SidebarComponent/SidebarComponent";
import { useSelector } from "react-redux";
import "./styles/renderPagination.css";
import "./styles/ButtonComponent.css";
import "./styles/FieldsComponent.css";
import "./styles/TicketStatus.css";

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
