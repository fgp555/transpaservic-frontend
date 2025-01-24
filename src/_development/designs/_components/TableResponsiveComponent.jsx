import React from "react";
import "./TableResponsiveComponent.css";

export const TableResponsiveComponent = ({ data }) => {
  return (
    <div className="TableResponsiveComponent">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>WhatsApp</th>
            <th>Rol</th>
            <th>Transporte</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td data-label="Nombre">{`${item.firstName} ${item.lastName}`}</td>
              <td data-label="Correo">{item.email}</td>
              <td data-label="WhatsApp">{item.whatsapp}</td>
              <td data-label="Rol">{item.role}</td>
              <td data-label="Transporte">{item.transport?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
