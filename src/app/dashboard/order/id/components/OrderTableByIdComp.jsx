import React from "react";
import "./OrderTableByIdComp.css";

const OrderTableByIdComp = ({ orderData, isPending }) => {
  return (
    <div className="OrderTableByIdComp">
      <h3>Información de la Orden #{orderData.id}</h3>
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
              <strong>Operador:</strong>
            </td>
            <td>{orderData.operator}</td>
          </tr>
          <tr>
            <td>
              <strong>Numero de Ticket:</strong>
            </td>
            <td>{orderData.ticketNumber || "N/A"}</td>
          </tr>
          <tr>
            <td>
              <strong>Estado:</strong>
            </td>
            <td className="TicketStatus">
              {orderData.status === "pendiente" && <span className="pendiente">Pendiente</span>}
              {orderData.status === "aprobado" && <span className="aprobado">Aprobado</span>}
              {orderData.status === "cancelado" && <span className="cancelado">Cancelado</span>}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <hr />
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Contrato de operador:</strong>
            </td>
            <td>{orderData.operatorContract}</td>
          </tr>
          <tr>
            <td>
              <strong>Número de orden:</strong>
            </td>
            <td>{orderData.orderNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Número de Autorización:</strong>
            </td>
            <td>{orderData.authorizationNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Cliente:</strong>
            </td>
            <td>{orderData.client}</td>
          </tr>
          <tr>
            <td>
              <strong>Nombre del paciente:</strong>
            </td>
            <td>{orderData.patientName}</td>
          </tr>
          <tr>
            <td>
              <strong>Cédula:</strong>
            </td>
            <td>{orderData.idCard}</td>
          </tr>
          <tr>
            <td>
              <strong>Teléfono:</strong>
            </td>
            <td>{orderData.userPhone}</td>
          </tr>
          <tr>
            <td>
              <strong>Correo electrónico:</strong>
            </td>
            <td>{orderData.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha de creación:</strong>
            </td>
            <td data-label="F. Emision"> {new Date(orderData.creationDate).toISOString().split("T")[0]}</td>
          </tr>
          <tr>
            <td>
              <strong>Origen:</strong>
            </td>
            <td>{orderData.origin}</td>
          </tr>
          <tr>
            <td>
              <strong>Destino:</strong>
            </td>
            <td>{orderData.destination}</td>
          </tr>
          <tr>
            <td>
              <strong>Itinerario:</strong>
            </td>
            <td>{orderData.itinerary}</td>
          </tr>
          <tr>
            <td>
              <strong>Cantidad:</strong>
            </td>
            <td>{orderData.quantity}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha de viaje:</strong>
            </td>
            <td>{orderData.travelDate}</td>
          </tr>
          <tr>
            <td>
              <strong>Valor:</strong>
            </td>
            <td>{orderData.value}</td>
          </tr>
          <tr>
            <td>
              <strong>Valor neto:</strong>
            </td>
            <td>{orderData.netValue}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>Comentarios:</strong>
            </td>
          </tr>
          <tr>
            <td colspan="2" style={{ width: "20ch" }}>
              {orderData.remarks}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableByIdComp;
