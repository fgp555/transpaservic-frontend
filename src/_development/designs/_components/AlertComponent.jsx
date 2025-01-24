import React from "react";
import "./AlertComponent.css";

export const AlertComponent = ({ type, message, onClose }) => {
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose} aria-label="Cerrar alerta">
        &times;
      </button>
    </div>
  );
};

