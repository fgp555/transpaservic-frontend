import React, { useEffect } from "react";
import "./SnackbarComponent.css"; // Asegúrate de agregar los estilos adecuados

 export const SnackbarComponent = ({ open, message, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose(); // Cierra el Snackbar después de 3 segundos
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }
  }, [open, onClose]);

  return (
    <div className={`snackbar ${open ? "show" : ""}`}>
      <span>{message}</span>
    </div>
  );
};
