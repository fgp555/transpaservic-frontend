import React from "react";

const TableExcelComp = ({ data }) => {
  return (
    <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>A | Contrato #. </th>
          <th>B | Orden #</th>
          <th>C | Autorización #</th>
          <th>E | Cliente</th>
          <th>G | Nombre Paciente</th>
          <th>H | Cedula</th>
          <th>BB | Teléfono</th>
          <th>BE | Email</th>
          <th>S | F. Emision</th>
          {/* ========== Información de Viaje ========== */}
          <th>I | Origen</th>
          <th>J | Destino</th>
          <th>K | Itinerario</th>
          <th>Q | F. Viaje</th>
          <th>L | Cantidad</th>
          <th>U | Valor</th>
          <th>V | Valor Neto</th>
          <th>P | Observaciones</th>
          {/* ========== Operator operation ====== */}
          <th>T | Operador</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.operatorContract}</td>
            <td>{row.orderNumber}</td>
            <td>{row.authorizationNumber}</td>
            <td>{row.client}</td>
            <td>{row.patientName}</td>
            <td>{row.idCard}</td>
            <td>{row.userPhone}</td>
            <td>{row.email}</td>
            <td>{row.creationDate}</td>
            {/* ========== Información de Viaje ========== */}
            <td>{row.origin}</td>
            <td>{row.destination}</td>
            <td>{row.itinerary}</td>
            <td>{row.travelDate}</td>
            <td>{row.quantity}</td>
            <td>{row.value}</td>
            <td>{row.netValue}</td>
            <td>{row.remarks}</td>
            {/* ========== Operator operation ====== */}
            <td>{row.operator}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableExcelComp;
