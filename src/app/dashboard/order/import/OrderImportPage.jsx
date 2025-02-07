import "./OrderImportPage.css";
import * as XLSX from "xlsx";
import OrderSubmitComponent from "./components/OrderSubmitComponent";
import React, { useState } from "react";
import TableExcelComp from "./components/TableExcelComp";

const OrderImportPage = () => {
  const [excelDataInicial, setExcelDataInicial] = useState([]);
  const [duplicateOperatorContract, setDuplicateOperatorContract] = useState([]);
  const [duplicateOrderNumber, setDuplicateOrderNumber] = useState([]);
  const [filteredDataWithoutDuplicates, setFilteredDataWithoutDuplicates] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true); // Iniciar el estado de carga

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
          .map((row, index) => {
            // Función para convertir números de fecha a formato legible
            const formatDate = (excelDate) => {
              if (!excelDate || typeof excelDate !== "number") return null;
              const parsedDate = XLSX.SSF.parse_date_code(excelDate);
              return `${parsedDate.y}-${String(parsedDate.m).padStart(2, "0")}-${String(parsedDate.d).padStart(2, "0")}`;
            };

            return {
              id: index + 1, // Agregar un identificador único para cada fila
              operatorContract: row[Object.keys(row)[0]],
              orderNumber: row[Object.keys(row)[1]],
              authorizationNumber: row[Object.keys(row)[2]],
              client: row[Object.keys(row)[4]],
              patientName: row[Object.keys(row)[6]],
              idCard: row[Object.keys(row)[7]],
              userPhone: row[Object.keys(row)[53]],
              email: row[Object.keys(row)[56]],
              creationDate: formatDate(row[Object.keys(row)[18]]), // Convertir creationDate
              // ========== Información de Viaje ==========
              origin: row[Object.keys(row)[8]],
              destination: row[Object.keys(row)[9]],
              itinerary: row[Object.keys(row)[10]],
              travelDate: formatDate(row[Object.keys(row)[16]]), // Convertir travelDate
              quantity: row[Object.keys(row)[11]],
              value: row[Object.keys(row)[20]],
              netValue: row[Object.keys(row)[21]],
              remarks: row[Object.keys(row)[15]],
              // ========== Operator operation ==========
              operator: row[Object.keys(row)[19]],
            };
          })
          // .filter((row) => Object.values(row).some((value) => value !== undefined && value !== null && value !== 0 && value !== "")); // Omitir filas vacías
          // Filtrar filas para omitir las que estén vacías, ignorando el campo `id`
          .filter((row) => {
            const { id, ...rest } = row; // Excluir el campo `id` para la validación
            return Object.values(rest).some((value) => value !== undefined && value !== null && value !== 0 && value !== "");
          });

        // Detectar duplicados en operatorContract y orderNumber
        const duplicates = detectDuplicates(filteredData);
        const nonDuplicateData = filteredData.filter((row) => !duplicates.operatorContract.includes(row.operatorContract) && !duplicates.orderNumber.includes(row.orderNumber));

        setExcelDataInicial(filteredData);
        setFilteredDataWithoutDuplicates(nonDuplicateData);

        // setExcelData(filteredData);

        // Detectar duplicados en operatorContract
        const duplicatesOperatorContract = findDuplicates(filteredData, "operatorContract");
        setDuplicateOperatorContract(duplicatesOperatorContract);

        // Detectar duplicados en orderNumber
        const duplicatesOrderNumber = findDuplicates(filteredData, "orderNumber");
        setDuplicateOrderNumber(duplicatesOrderNumber);

        setIsLoading(false); // Terminar el estado de carga
      }
    };

    // Leer el archivo como un ArrayBuffer
    reader.readAsArrayBuffer(file);
  };

  const detectDuplicates = (data) => {
    const operatorContractSet = new Set();
    const orderNumberSet = new Set();
    const duplicateOperatorContract = [];
    const duplicateOrderNumber = [];

    data.forEach((row) => {
      if (operatorContractSet.has(row.operatorContract)) {
        duplicateOperatorContract.push(row.operatorContract);
      } else {
        operatorContractSet.add(row.operatorContract);
      }

      if (orderNumberSet.has(row.orderNumber)) {
        duplicateOrderNumber.push(row.orderNumber);
      } else {
        orderNumberSet.add(row.orderNumber);
      }
    });

    return {
      operatorContract: duplicateOperatorContract,
      orderNumber: duplicateOrderNumber,
    };
  };

  // Función para encontrar duplicados en una columna específica
  const findDuplicates = (data, key) => {
    const seen = new Map();
    const duplicates = [];

    data.forEach((row) => {
      const value = row[key];
      if (value) {
        if (seen.has(value)) {
          duplicates.push(row); // Si ya lo hemos visto, lo marcamos como duplicado
        } else {
          seen.set(value, true);
        }
      }
    });

    return duplicates;
  };

  return (
    <div className="OrderImportPage">
      <h1>Leer y Subir archivo Excel</h1>
      <br />
      <div className="file-upload">
        <aside>
          <label htmlFor="file-input" className={`btn btn-primary LoadingButton ${isLoading ? "loadingProgress" : ""}`}>
            {isLoading ? (
              <>
                <span className="spinnerLoop"></span>Procesando...
              </>
            ) : (
              "Leer archivo excel"
            )}
          </label>
          <input
            //
            id="file-input"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            hidden
          />
          {isLoading && <div className="loading-spinner"></div>}
        </aside>
        <aside>
          {excelDataInicial.length > 0 && (
            <section className="actions-section">
              {/* <p>Una vez verificado la informacion ya puede enviar a la base de datos</p> */}
              <OrderSubmitComponent filteredDataWithoutDuplicates={filteredDataWithoutDuplicates} />
              <br />
            </section>
          )}
        </aside>
      </div>

      <div>
        <section className="duplicates-section">
          {duplicateOperatorContract.length > 0 && (
            <div className="duplicates">
              <h2>Duplicados en Contrato de operador No.</h2>
              <ul>
                {duplicateOperatorContract.map((row) => (
                  <li key={row.id}>
                    Fila {row.id}: {row.operatorContract}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
          {duplicateOrderNumber.length > 0 && (
            <div className="duplicates">
              <h2>Duplicados en Numero Orden</h2>
              <ul>
                {duplicateOrderNumber.map((row) => (
                  <li key={row.id}>
                    Fila {row.id}: {row.orderNumber}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        {/* <br /> */}

        <section>
          {excelDataInicial.length > 0 && (
            <section className="excelData-container">
              {duplicateOperatorContract.length !== 0 || duplicateOrderNumber.length !== 0 ? (
                <>
                  <h2>Todos los datos leídos sin filtrar</h2>
                  <TableExcelComp data={excelDataInicial} />
                </>
              ) : (
                <>
                  <h2>No hay duplicados</h2>
                </>
              )}
            </section>
          )}
        </section>
      </div>
      {/* <pre>{JSON.stringify(duplicateOperatorContract, null, 2)}</pre> */}
      {excelDataInicial.length > 0 && (
        <>
          <section className="filteredDataWithoutDuplicates-section">
            <br />
            {/* <h2>Datos Filtrados</h2> */}
            <TableExcelComp data={filteredDataWithoutDuplicates} />
          </section>
          <br />
        </>
      )}
    </div>
  );
};

export default OrderImportPage;
