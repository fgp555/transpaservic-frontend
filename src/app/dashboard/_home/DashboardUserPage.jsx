import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const DashboardUserPage = () => {
  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux

  return (
    <div className="DashboardAdminPage">
      <section>{theme === "dark" ? <img className="logo" src="/logo-dark.svg" alt="" /> : <img className="logo" src="/logo.svg" alt="" />}</section>
      <header className="header">
        <h1>Gestión Centralizada de Ordenes</h1>
        <p>Plataforma SaaS para administrar y supervisar Ordenes de viajes de múltiples Operadores.</p>
      </header>

      <br />
    </div>
  );
};

export default DashboardUserPage;
