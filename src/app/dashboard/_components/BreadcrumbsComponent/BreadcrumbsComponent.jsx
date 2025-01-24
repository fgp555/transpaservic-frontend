import React from "react";
import { Link } from "react-router-dom"; // Si usas React Router
import "./BreadcrumbsComponent.css"; // Asegúrate de tener el archivo CSS

export const BreadcrumbsComponent = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index !== items.length - 1 ? (
              <Link to={item.link} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
