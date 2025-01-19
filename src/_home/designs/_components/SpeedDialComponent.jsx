import React, { useState } from "react";
import "./SpeedDialComponent.css"; // Asegúrate de tener los estilos adecuados

export const SpeedDialComponent = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSpeedDial = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="speed-dial">
      <button className="speed-dial-main" onClick={toggleSpeedDial}>
        <span>+</span>
      </button>
      <div className={`speed-dial-actions ${isOpen ? "open" : ""}`}>
        {actions.map((action, index) => (
          <button key={index} className="speed-dial-action" onClick={action.onClick} title={action.label}>
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
