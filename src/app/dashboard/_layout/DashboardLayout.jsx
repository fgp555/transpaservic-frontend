import "./DashboardLayout.css";
import SidebarComponent from "../_components/SidebarComponent/SidebarComponent";
import { useSelector } from "react-redux";
import "./styles/renderPagination.css";
import "./styles/ButtonComponent.css";
import "./styles/FieldsComponent.css";
import "./styles/TicketStatus.css";
import "./styles/LoadingButton.css";
import "./styles/TableComp.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const DashboardLayout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux

  const isLogin = useSelector((state) => state.user?.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <div className={`DashboardLayout ${theme === "dark" ? "dark-mode" : ""}`}>
      <SidebarComponent />
      <main className="DashboardLayout__main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
