import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./TicketImportPage.css";

const TicketImportPage = () => {
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
            transportContract: row[Object.keys(row)[0]],
            orderNumber: row[Object.keys(row)[1]],
            mainDiagnosis: row[Object.keys(row)[2]],
            client: row[Object.keys(row)[4]],
            patientName: row[Object.keys(row)[6]],
            idCard: row[Object.keys(row)[7]],
            userPhone: row[Object.keys(row)[53]],
            email: row[Object.keys(row)[56]],
            origin: row[Object.keys(row)[8]],
            destination: row[Object.keys(row)[9]],
            itinerary: row[Object.keys(row)[10]],
            quantity: row[Object.keys(row)[11]],
            travelDate: row[Object.keys(row)[16]],
            postalNumber: row[Object.keys(row)[17]],
            createDate: row[Object.keys(row)[18]],
            value: row[Object.keys(row)[20]],
            netValue: row[Object.keys(row)[21]],
            check: row[Object.keys(row)[19]],
            remarks: row[Object.keys(row)[15]],
          }))
          .filter((row) => Object.values(row).some((value) => value !== undefined && value !== 0 && value !== "")); // Omitir filas vacías

        setExcelData(filteredData);
      }
    };

    // Leer el archivo como un ArrayBuffer
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="TicketImportPage">
      <h1>Subir y leer un archivo Excel</h1>
      <br />
      <input className="btn btn-primary" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {excelData.length > 0 && (
        <>
          <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>A | Contrato de transporte No. </th>
                <th>B | Numero Orden</th>
                <th>C | Diagnostico Principal</th>
                <th>E | CLIENTE</th>
                <th>G | NOMBRE PACIENTE</th>
                <th>H | CEDULA</th>
                <th>BB | Teléfono</th>
                <th>BE | Email</th>
                <th>I | Origen</th>
                <th>J | Destino</th>
                <th>K | Itinerario</th>
                <th>L | Cantidad</th>
                <th>Q | Fecha de Viaje</th>
                {/* <th>R | CORREO No.❓</th> */}
                <th>S | Fecha de Creación</th>
                <th>U | Valor</th>
                <th>V | Valor Neto</th>
                <th>T | Cheque</th>
                <th>P | Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  <td>{row.transportContract}</td>
                  <td>{row.orderNumber}</td>
                  <td>{row.mainDiagnosis}</td>
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
                  {/* <td>{row.postalNumber}</td> */}
                  <td>{row.createDate}</td>
                  <td>{row.value}</td>
                  <td>{row.netValue}</td>
                  <td>{row.check}</td>
                  <td>{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <p>Una vez verificado la informacion ya puede enviar a la base de datos</p>
          <button className="btn btn-primary" onClick={() => alert("boton en desarrollo")}>Enviar a la base de datos</button>
          <br />
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default TicketImportPage;
