export const downloadCSV = (orders) => {
  // Si no hay órdenes, salir
  if (!orders || orders.length === 0) {
    console.error("No hay datos para exportar a CSV");
    return;
  }

  // Definir las columnas del CSV
  const headers = [
    "ID",
    "Contrato",
    "Número de Orden",
    "Número de Autorización",
    "Cliente",
    "Nombre del Paciente",
    "Cédula",
    "Teléfono",
    "Email",
    "Fecha de Creación",
    "Origen",
    "Destino",
    "Itinerario",
    "Fecha de Viaje",
    "Cantidad",
    "Valor",
    "Valor Neto",
    "Observaciones",
    "Estado",
    "Número de Ticket",
    "Operador",
  ];

  // Convertir las órdenes a formato CSV
  const csvRows = [];
  csvRows.push(headers.join(",")); // Agregar la cabecera

  orders.forEach((order) => {
    const row = [
      order.id,
      order.operatorContract,
      order.orderNumber,
      order.authorizationNumber,
      order.client,
      order.patientName,
      order.idCard,
      order.userPhone,
      order.email,
      order.creationDate,
      order.origin,
      order.destination,
      order.itinerary,
      order.travelDate,
      order.quantity,
      order.value,
      order.netValue,
      order.remarks,
      order.status,
      order.ticketNumber,
      order.operator?.name || "",
    ];

    csvRows.push(row.map((value) => `"${value}"`).join(",")); // Envolver cada valor en comillas dobles
  });

  // Crear el archivo CSV
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Crear enlace de descarga
  const link = document.createElement("a");
  link.href = url;
  link.download = "ordenes.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
