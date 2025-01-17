import React from "react";
import "./ButtonComponent.css";

export const ButtonComponent = ({ label, variant = "primary", onClick, disabled = false, size = "medium" }) => {
  return (
    <button className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""} btn-${size}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export const ButtonIconComponent = ({ label, variant = "primary", icon, iconPosition = "left", onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {icon && iconPosition === "left" && <span className="btn-icon">{icon}</span>}
      {label}
      {icon && iconPosition === "right" && <span className="btn-icon">{icon}</span>}
    </button>
  );
};
