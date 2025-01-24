import React, { useState } from "react";
import "./AccordionComponent.css"; // Asegúrate de que los estilos sean correctos

export const AccordionComponent = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null); // Índice de la sección abierta

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Alternar entre abrir/cerrar
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndex === index ? "open" : ""}`} // Aplicar la clase "open"
        >
          <div className="accordion-header" onClick={() => toggleAccordion(index)}>
            <h3>{item.title}</h3>
            <span>{openIndex === index ? "-" : "+"}</span>
          </div>
          {/* Mostrar el contenido solo cuando está abierto */}
          {openIndex === index && (
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
