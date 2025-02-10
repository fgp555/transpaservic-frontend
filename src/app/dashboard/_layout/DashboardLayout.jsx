import "./DashboardLayout.css";
import "./styles/ButtonComponent.css";
import "./styles/FieldsComponent.css";
import "./styles/LoadingButton.css";
import "./styles/renderPagination.css";
import "./styles/TableComp.css";
import "./styles/TicketStatus.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SidebarComponent from "../_components/SidebarComponent/SidebarComponent";
import useValidateToken from "../../../hooks/useValidateToken";

const DashboardLayout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isAuthenticated = useValidateToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>; // Mientras se valida, mostrar un loader
  }

  return (
    <div className={`DashboardLayout ${theme === "dark" ? "dark-mode" : ""}`}>
      <SidebarComponent />
      <main className="DashboardLayout__main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
