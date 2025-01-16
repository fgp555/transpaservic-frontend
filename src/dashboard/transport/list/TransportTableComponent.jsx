// src/dashboard/transport/list/TransportTableComponent.jsx

import React from "react";
import "./TransportTableComponent.css";

const TransportTableComponent = ({ transportData }) => {
  return (
    <div className="TransportTableComponent">
      <h3>Lista de Transportes</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>WhatsApp</th>
            <th>Email</th>
            <th>Sitio Web</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {transportData?.results?.map((transport) => (
            <tr key={transport.id}>
              <td>{transport.id}</td>
              <td>{transport.name}</td>
              <td>{transport.username}</td>
              <td>{transport.whatsapp}</td>
              <td>{transport.email}</td>
              <td>
                <a href={transport.website} target="_blank" rel="noopener noreferrer">
                  {transport.website}
                </a>
              </td>
              <td>{new Date(transport.registrationDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTableComponent;
