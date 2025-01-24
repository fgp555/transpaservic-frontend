import React from "react";
import "./SwitchComponent.css";

export const SwitchComponent = ({ isOn, handleToggle, label = "" }) => {
  return (
    <div className="switch-container">
      {label && <span className="switch-label">{label}</span>}
      <div className={`switch ${isOn ? "switch-on" : "switch-off"}`} onClick={handleToggle}>
        <div className={`switch-thumb ${isOn ? "thumb-on" : "thumb-off"}`}></div>
      </div>
    </div>
  );
};
