import React from "react";
import "./InputComponent.css";

export const InputComponent = ({ type = "text", placeholder, value, onChange, size = "medium" }) => {
  return (
    <>
      <input type={type} className={`input input-${size}`} placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
};
