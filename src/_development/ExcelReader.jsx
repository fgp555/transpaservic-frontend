import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        // Leer el archivo como un libro de Excel
        const workbook = XLSX.read(data, { type: "array" });

        // Tomar la primera hoja
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir los datos de la hoja a un formato JSON, comenzando desde la fila 2
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          range: 1, // Comienza desde la fila 2
        });

        // Filtrar y mapear las columnas deseadas con sus nombres
        const filteredData = jsonData
          .map((row) => ({
            operatorContract: row[Object.keys(row)[0]], // Columna 0
            orderNumber: row[Object.keys(row)[1]], // Columna 1
            authorizationNumber: row[Object.keys(row)[2]], // Columna 2
            client: row[Object.keys(row)[3]], // Columna 3
            patientName: row[Object.keys(row)[4]], // Columna 4
            idCard: row[Object.keys(row)[5]], // Columna 5
            userPhone: row[Object.keys(row)[39]], // Columna 39
            email: row[Object.keys(row)[42]], // Columna 42
            origin: row[Object.keys(row)[6]], // Columna 6
            destination: row[Object.keys(row)[7]], // Columna 7
            itinerary: row[Object.keys(row)[8]], // Columna 8
            quantity: row[Object.keys(row)[9]], // Columna 9
            travelDate: row[Object.keys(row)[11]], // Columna 11
            postalNumber: row[Object.keys(row)[12]], // Columna 12
            createDate: row[Object.keys(row)[13]], // Columna 13
            value: row[Object.keys(row)[15]], // Columna 15
            netValue: row[Object.keys(row)[16]], // Columna 16
            operator: row[Object.keys(row)[14]], // Columna 14
            remarks: row[Object.keys(row)[10]], // Columna 10
          }))
          .filter((row) => Object.values(row).some((value) => value !== undefined && value !== 0 && value !== "")); // Omitir filas vacías

        setExcelData(filteredData);
      }
    };

    // Leer el archivo como un ArrayBuffer
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Subir y leer un archivo Excel</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {excelData.length > 0 && (
        <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Contrato de Operador</th>
              <th>Número de Orden</th>
              <th>Autorización #</th>
              <th>Cliente</th>
              <th>Nombre del Paciente</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Itinerario</th>
              <th>Cantidad</th>
              <th>Fecha de Viaje</th>
              <th>Código Postal</th>
              <th>Fecha de Creación</th>
              <th>Valor</th>
              <th>Valor Neto</th>
              <th>Operador</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index}>
                <td>{row.operatorContract}</td>
                <td>{row.orderNumber}</td>
                <td>{row.authorizationNumber}</td>
                <td>{row.client}</td>
                <td>{row.patientName}</td>
                <td>{row.idCard}</td>
                <td>{row.userPhone}</td>
                <td>{row.email}</td>
                <td>{row.origin}</td>
                <td>{row.destination}</td>
                <td>{row.itinerary}</td>
                <td>{row.quantity}</td>
                <td>{row.travelDate}</td>
                <td>{row.postalNumber}</td>
                <td>{row.createDate}</td>
                <td>{row.value}</td>
                <td>{row.netValue}</td>
                <td>{row.operator}</td>
                <td>{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;
