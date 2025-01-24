import React from "react";
import "./CardComponent.css";

export const CardComponent = ({ title, description, children }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {children}
    </div>
  );
};


export const UsersCardComponent = ({ title, description, children }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {children}
    </div>
  );
};