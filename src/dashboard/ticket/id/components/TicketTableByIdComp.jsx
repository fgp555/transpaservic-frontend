import React from "react";
import "./TicketTableByIdComp.css";

const TicketTableByIdComp = ({ ticketData }) => {
  return (
    <div className="TicketTableByIdComp">
      <h3>Información de la Orden #{ticketData.id}</h3>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Contrato de transporte:</strong>
            </td>
            <td>{ticketData.transportContract}</td>
          </tr>
          <tr>
            <td>
              <strong>Número de orden:</strong>
            </td>
            <td>{ticketData.orderNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Diagnóstico principal:</strong>
            </td>
            <td>{ticketData.mainDiagnosis}</td>
          </tr>
          <tr>
            <td>
              <strong>Cliente:</strong>
            </td>
            <td>{ticketData.client}</td>
          </tr>
          <tr>
            <td>
              <strong>Nombre del paciente:</strong>
            </td>
            <td>{ticketData.patientName}</td>
          </tr>
          <tr>
            <td>
              <strong>Cédula:</strong>
            </td>
            <td>{ticketData.idCard}</td>
          </tr>
          <tr>
            <td>
              <strong>Teléfono:</strong>
            </td>
            <td>{ticketData.userPhone}</td>
          </tr>
          <tr>
            <td>
              <strong>Correo electrónico:</strong>
            </td>
            <td>{ticketData.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha de creación:</strong>
            </td>
            <td>{ticketData.creationDate}</td>
          </tr>
          <tr>
            <td>
              <strong>Origen:</strong>
            </td>
            <td>{ticketData.origin}</td>
          </tr>
          <tr>
            <td>
              <strong>Destino:</strong>
            </td>
            <td>{ticketData.destination}</td>
          </tr>
          <tr>
            <td>
              <strong>Itinerario:</strong>
            </td>
            <td>{ticketData.itinerary}</td>
          </tr>
          <tr>
            <td>
              <strong>Cantidad:</strong>
            </td>
            <td>{ticketData.quantity}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha de viaje:</strong>
            </td>
            <td>{ticketData.travelDate}</td>
          </tr>
          <tr>
            <td>
              <strong>Valor:</strong>
            </td>
            <td>{ticketData.value}</td>
          </tr>
          <tr>
            <td>
              <strong>Valor neto:</strong>
            </td>
            <td>{ticketData.netValue}</td>
          </tr>
          <tr>
            <td>
              <strong>Cheque:</strong>
            </td>
            <td>{ticketData.check}</td>
          </tr>
          <tr>
            <td>
              <strong>Comentarios:</strong>
            </td>
            <td>{ticketData.remarks}</td>
          </tr>
          <tr>
            <td>
              <strong>Estado:</strong>
            </td>
            <td>{ticketData.status}</td>
          </tr>
          <tr>
            <td>
              <strong>Transporte:</strong>
            </td>
            <td>{ticketData.transport}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TicketTableByIdComp;
