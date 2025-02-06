import React from "react";
import { NavLink } from "react-router";
import "./Page404.css";

const Page404 = () => {
  return (
    <div className="Page404">
      <div className="PageFilter">
        <div className="Page404Box">
          <i class="fa-solid fa-truck-fast Icon404 fa-5x"></i>
          <h1 className="Title404">404</h1>

          <p className="Text404">La página que buscas no existe.</p>
          <NavLink to="/" className="NavLink404 btn btn-primary">
            VOLVER A INICIO
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Page404;
