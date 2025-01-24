import React from "react";
import "./CheckBoxComponent.css";

export const CheckBoxComponent = ({ label, isChecked, onToggle, size = "medium" }) => {
  return (
    <div className={`checkbox-container checkbox-${size}`}>
      <input type="checkbox" id={label} checked={isChecked} onChange={onToggle} className="checkbox-input" />
      <label htmlFor={label} className="checkbox-label">
        <span className="checkbox-custom"></span>
        {label}
      </label>
    </div>
  );
};
