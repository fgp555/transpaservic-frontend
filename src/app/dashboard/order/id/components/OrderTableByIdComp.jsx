import React, { useState } from "react";
import "./OrderTableByIdComp.css";
import { namesOrderFields, statusOrderNames } from "../../../../../utils/namesFields";
import { formatDate, formatDateISO, renderStatus } from "../../utils/OrderComp";

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
        <h3>Orden {orderData.orderNumber}</h3>
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
            <td>{namesOrderFields.operator}</td>
            <td>{orderData.operator}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.orderNumber}</td>
            <td>{orderData.orderNumber}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.status}</td>
            <td className="OrderStatusDetail">{renderStatus(orderData.status)}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.patientName}</td>
            <td>{orderData.patientName}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.idCard}</td>
            <td>{orderData.idCard}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.userPhone}</td>
            <td>{orderData.userPhone}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.itinerary}</td>
            <td>{orderData.itinerary}</td>
          </tr>

          <tr>
            <td>{namesOrderFields.creationDate}</td>
            <td data-label="F. Emision">{formatDateISO(orderData.creationDate)}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.expirationDate}</td>
            <td>{formatDateISO(orderData.expirationDate)}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.travelDate}</td>
            <td>{orderData.travelDate || "—"}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.approvalDate[0]}</td>
            <td>{formatDate(orderData.approvalDate)}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.approvalTravelDate[1]}</td>
            <td>{orderData.approvalTravelDate || "—"}</td>
          </tr>

          <tr>
            <td>{namesOrderFields.ticketNumber}</td>
            <td>{orderData.ticketNumber || "—"}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.quantity[1]}</td>
            <td>{orderData.quantity}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.approvalQuantity[1]}</td>
            <td>{orderData.approvalQuantity || "—"}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.authorizationNumber}</td>
            <td>{orderData.authorizationNumber}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.operatorContract}</td>
            <td>{orderData.operatorContract}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.value}</td>
            <td>{orderData.value}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.netValue}</td>
            <td>{orderData.netValue}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.origin}</td>
            <td>{orderData.origin}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.destination}</td>
            <td>{orderData.destination}</td>
          </tr>
          <tr>
            <td>{namesOrderFields.client}</td>
            <td>{orderData.client}</td>
          </tr>
          <tr>
            <td colSpan="2">{namesOrderFields.remarks}</td>
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
