import React from 'react'
import './ChipComponent.css'

export const ChipComponent = ({ label, onRemove, onClick, removable = false }) => {
    return (
      <div className="chip-container">
        <span className="chip-label" onClick={onClick}>
          {label}
        </span>
        {removable && (
          <button className="chip-remove" onClick={onRemove} aria-label="Eliminar chip">
            &times;
          </button>
        )}
      </div>
    );
  };
  

