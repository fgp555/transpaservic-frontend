// src\app\dashboard\order\list\utils\downloadPDF.js

import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Genera y descarga un archivo PDF basado en los datos proporcionados.
 * @param {Array} orders - Lista de orders para incluir en el PDF.
 */
export const downloadPDF = (orders, userSlice) => {
  console.log("Orders data:", orders); // Verifica que 'orders' tenga los datos correctos

  if (!orders || orders.length === 0) {
    console.error("No hay datos para generar el PDF");
    return;
  }

  // const doc = new jsPDF({ orientation: "landscape" }); // Cambia a orientación horizontal
  const doc = new jsPDF({
    orientation: "landscape", // Horizontal
    unit: "mm", // Unidad en milímetros
    format: "a2", // Tamaño de hoja A4
  });

  // Título
  doc.setFontSize(18);
  doc.text("Reporte de Órdenes", 14, 20);

  // Información adicional
  doc.setFontSize(12);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Usuario: ${userSlice?.user?.name || "Desconocido"}`, 14, 35);

  // Columnas de la tabla (incluyendo las adicionales)
  const tableColumn = [
    "ID",
    "Contrato de Operador",
    "Número de Orden",
    "Diagnóstico",
    "Cliente",
    "Paciente",
    "Identificación",
    "Teléfono",
    "Correo",
    "Fecha de Creación",
    "Origen",
    "Destino",
    "Itinerario",
    "Cantidad",
    "F. Viaje",
    "Valor",
    "Estado",
    "Operador",
  ];

  // Filas de la tabla (incluyendo los datos para las columnas adicionales)
  const tableRows = orders.map((order) => [
    order.id,
    order.operatorContract || "",
    order.orderNumber || "",
    order.authorizationNumber || "",
    order.client || "",
    order.patientName || "",
    order.idCard || "", // Nueva columna: Identificación
    order.userPhone || "",
    order.email || "",
    new Date(order.creationDate).toLocaleDateString() || "", // Nueva columna: Fecha de Creación
    order.origin || "", // Nueva columna: Origen
    order.destination || "", // Nueva columna: Destino
    order.itinerary || "", // Nueva columna: Itinerario
    order.quantity || "", // Nueva columna: Cantidad
    order.travelDate || "",
    order.value || "", // Nueva columna: Valor
    order.status || "",
    order.operator.name || "", // Nueva columna: Operador
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: "grid",
    styles: { fontSize: 10 },
  });

  // Guardar el PDF
  doc.save("reporte_ordenes.pdf");
};
