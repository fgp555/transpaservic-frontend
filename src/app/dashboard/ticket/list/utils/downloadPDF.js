import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Genera y descarga un archivo PDF basado en los datos proporcionados.
 * @param {Array} tickets - Lista de tickets para incluir en el PDF.
 */
export const downloadPDF = (tickets) => {
  const doc = new jsPDF();

  // Título del PDF
  doc.text("Ticket List", 14, 10);

  // Columnas y filas para la tabla
  const tableHeaders = [
    "ID",
    "Transport Contract",
    "Order Number",
    "Patient Name",
    "ID Card",
    "User Phone",
    "Email",
    "Origin",
    "Destination",
    "Travel Date",
    "Status",
    "Transport",
  ];

  const tableBody = tickets.map((ticket) => [
    ticket.id,
    ticket.transportContract,
    ticket.orderNumber,
    ticket.patientName,
    ticket.idCard,
    ticket.userPhone,
    ticket.email,
    ticket.origin,
    ticket.destination,
    ticket.travelDate,
    ticket.status,
    ticket.transport?.name || "N/A", // Validación en caso de que no exista el nombre del transporte
  ]);

  // Generar la tabla en el PDF
  doc.autoTable({
    head: [tableHeaders],
    body: tableBody,
    startY: 20, // Espaciado después del título
  });

  // Descargar el archivo PDF
  doc.save("tickets.pdf");
};
