import React from "react";
import "./DashboardAdminPage.css";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const DashboardAdminPage = () => {
  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux

  return (
    <div className="DashboardAdminPage">
      <section>{theme === "dark" ? <img className="logo" src="/logo-dark.svg" alt="" /> : <img className="logo" src="/logo.svg" alt="" />}</section>
      <header className="header">
        <h1>Gestión Centralizada de Ordenes</h1>
        <p>Plataforma SaaS para administrar y supervisar Ordenes de viajes de múltiples Operadores.</p>
      </header>

      <br />
      <section className="section">
        <h2>Acciones Rápidas</h2>
        <div className="actions">
          <button className="btn btn-primary">
            <NavLink to="/dashboard/order/create">Registrar Nueva Orden</NavLink>
          </button>

          <button className="btn btn-primary">
            <NavLink to="/dashboard/operator/create">Registrar Nuevo Operador</NavLink>
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdminPage;
