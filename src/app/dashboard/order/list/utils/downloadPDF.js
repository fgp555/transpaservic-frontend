import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Genera y descarga un archivo PDF basado en los datos proporcionados.
 * @param {Array} orders - Lista de orders para incluir en el PDF.
 */
export const downloadPDF = (orders) => {
  const doc = new jsPDF();

  // Título del PDF
  doc.text("Order List", 14, 10);

  // Columnas y filas para la tabla
  const tableHeaders = [
    "ID",
    "Operator Contract",
    "Order Number",
    "Patient Name",
    "ID Card",
    "User Phone",
    "Email",
    "Origin",
    "Destination",
    "Travel Date",
    "Status",
    "Operator",
  ];

  const tableBody = orders.map((order) => [
    order.id,
    order.operatorContract,
    order.orderNumber,
    order.patientName,
    order.idCard,
    order.userPhone,
    order.email,
    order.origin,
    order.destination,
    order.travelDate,
    order.status,
    order.operator?.name || "N/A", // Validación en caso de que no exista el nombre del operador
  ]);

  // Generar la tabla en el PDF
  doc.autoTable({
    head: [tableHeaders],
    body: tableBody,
    startY: 20, // Espaciado después del título
  });

  // Descargar el archivo PDF
  doc.save("orders.pdf");
};
