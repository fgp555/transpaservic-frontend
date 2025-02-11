import React, { useState } from "react";
import "./OrderTableByIdComp.css";
import { namesFields } from "../../../../../utils/namesFields";

const OrderTableByIdComp = ({ orderData, isPending, setOrderNumberState, orderNumberState }) => {
  const [searchId, setSearchId] = useState(orderNumberState); // Estado local para el input

  const handleSearch = (e) => {
    // alert("en desarrollo...");
    // return;
    e.preventDefault();
    setOrderNumberState(searchId); // Actualiza el estado solo al hacer clic en el botón
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
          <tr><th>Campo</th><th>Valor</th></tr>
        </thead>
        <tbody>
          <tr><td>{namesFields.operator}</td><td>{orderData.operator}</td></tr>
          <tr><td>{namesFields.orderNumber}</td><td>{orderData.orderNumber}</td></tr>
          <tr><td>{namesFields.status}</td><td className="TicketStatus">{orderData.status === "pendiente" && <span className="pendiente">Pendiente</span>}
              {orderData.status === "aprobado" && <span className="aprobado">Aprobado</span>}
              {orderData.status === "cancelado" && <span className="cancelado">Cancelado</span>}
              </td></tr>
          <tr><td>{namesFields.patientName}</td><td>{orderData.patientName}</td></tr>
          <tr><td>{namesFields.idCard}</td><td>{orderData.idCard}</td></tr>
          <tr><td>{namesFields.userPhone}</td><td>{orderData.userPhone}</td></tr>
          <tr><td>{namesFields.itinerary}</td><td>{orderData.itinerary}</td></tr>

          <tr><td>{namesFields.creationDate}</td><td data-label="F. Emision"> {new Date(orderData.creationDate).toISOString().split("T")[0]}</td></tr>
          <tr><td>"Vigencia (48 dias?)"</td><td>"2025-02-02"</td></tr>
          <tr><td>{namesFields.travelDate}</td><td>{orderData.travelDate || "N/A"}</td></tr>
          <tr><td>{namesFields.approvalDate}</td><td>{orderData.approvalDate
                ? new Date(orderData.approvalDate).toLocaleString("es-CO", {
                    timeZone: "America/Bogota",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A"}
            </td>
          </tr>
          <tr><td>{namesFields.ticketNumber}</td><td>{orderData.ticketNumber || "N/A"}</td></tr>
          <tr><td>{namesFields.quantity}</td><td>{orderData.quantity}</td></tr>
          <tr><td>{namesFields.value}</td><td>{orderData.value}</td></tr>
          <tr><td>{namesFields.netValue}</td><td>{orderData.netValue}</td></tr>

          <tr><td>{namesFields.operatorContract}</td><td>{orderData.operatorContract}</td></tr>
          <tr><td>{namesFields.authorizationNumber}</td><td>{orderData.authorizationNumber}</td></tr>
          <tr><td>{namesFields.client}</td><td>{orderData.client}</td></tr>
          <tr><td>{namesFields.email}</td><td>{orderData.email}</td></tr>
          <tr><td>{namesFields.origin}</td><td>{orderData.origin}</td></tr>
          <tr><td>{namesFields.destination}</td><td>{orderData.destination}</td></tr>
          <tr><td colSpan="2">{namesFields.remarks}</td></tr><tr><td colSpan="2" style={{ width: "20ch" }}>{orderData.remarks}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableByIdComp;
