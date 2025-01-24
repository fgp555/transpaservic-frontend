 export const downloadCSV = () => {
    const csvRows = [];

    // Encabezados
    const headers = [
      "ID",
      "Contrato de Operador",
      "Número de Orden",
      "Diagnóstico Principal",
      "Cliente",
      "Nombre del Paciente",
      "Número de Identificación",
      "Teléfono",
      "Correo Electrónico",
      "Fecha de Creación",
      "Origen",
      "Destino",
      "Itinerario",
      "Cantidad",
      "Fecha de Viaje",
      "Valor",
      "Valor Neto",
      "Cheque",
      "Comentarios",
      "Estado",
      "Transporte (Nombre)",
    ];
    csvRows.push(headers.join(","));

    // Datos
    tickets.forEach((ticket) => {
      const row = [
        ticket.id,
        ticket.transportContract || "",
        ticket.orderNumber || "",
        ticket.mainDiagnosis || "",
        ticket.client || "",
        ticket.patientName || "",
        ticket.idCard || "",
        ticket.userPhone || "",
        ticket.email || "",
        ticket.creationDate || "",
        ticket.origin || "",
        ticket.destination || "",
        ticket.itinerary || "",
        ticket.quantity || "",
        ticket.travelDate || "",
        ticket.value || "",
        ticket.netValue || "",
        ticket.check || "",
        ticket.remarks || "",
        ticket.status || "",
        ticket.transport?.name || "",
      ];
      csvRows.push(row.join(","));
    });

    // Generar archivo CSV con BOM
    const csvContent = "\uFEFF" + csvRows.join("\n"); // Agrega el BOM al inicio del archivo
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };