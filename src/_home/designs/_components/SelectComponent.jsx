import React from "react";
import "./SelectComponent.css";

export const SelectComponent = ({ options, value, onChange, placeholder = "Selecciona una opción", size = "medium" }) => {
  return (
    <div className={`select-container select-${size}`}>
      <select className="select" value={value} onChange={onChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
