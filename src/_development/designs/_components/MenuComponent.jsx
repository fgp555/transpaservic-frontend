import React, { useState } from "react";
import { Link } from "react-router-dom"; // Si usas React Router
import "./MenuComponent.css"; // Asegúrate de tener el archivo CSS

export const MenuComponent = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? "Cerrar Menu" : "Abrir Menu"}
      </button>
      <ul className={`menu-list ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <li key={index} className="menu-item">
            <Link to={item.link} className="menu-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
