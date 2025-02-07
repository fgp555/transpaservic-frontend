import React, { useState } from "react";
import "./OrderTableByIdComp.css";

const OrderTableByIdComp = ({ orderData, isPending, setOrderId, orderId }) => {
  const [searchId, setSearchId] = useState(orderId); // Estado local para el input

  const handleSearch = (e) => {
    // alert("en desarrollo...");
    // return;
    e.preventDefault();
    setOrderId(searchId); // Actualiza el estado solo al hacer clic en el botón
  };
  return (
    <div className="OrderTableByIdComp">
      <div>
        <label htmlFor="">Buscar orden</label>
        <form action="" className="dashboard findOneOrderNumber">
          <input
            id="orderInput"
            type="text"
            placeholder="Número de Orden"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Solo cambia el input, no busca aún
          />
          <button type="submit" onClick={handleSearch} className="btn btn-primary">
            Buscar Orden
          </button>
        </form>
        <br />
      </div>
      <div className="header_container">
        <h3>Detalles de la Orden {orderData.orderNumber}</h3>
        {/* <span className="btn_container">
          <button className="btn btn-primary">
            <i className="fa-solid fa-file-csv"></i>
          </button>
          <button className="btn btn-primary">
            <i className="fa-solid fa-file-pdf"></i>
          </button>
        </span> */}
      </div>
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
              <strong>Fecha de viaje:</strong>
            </td>
            <td>{orderData.travelDate}</td>
          </tr>
          {/* </tbody>
      </table>
      <br />
      <hr />
      <table>
        <tbody> */}
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
            <td colSpan="2">
              <strong>Comentarios:</strong>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ width: "20ch" }}>
              {orderData.remarks}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableByIdComp;
