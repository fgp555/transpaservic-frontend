 export const downloadCSV = () => {
    const csvRows = [];

    // Encabezados
    const headers = [
      "ID",
      "Contrato de Operador",
      "Número de Orden",
      "Autorización #",
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
      "Comentarios",
      "Estado",
      "Operador (Nombre)",
    ];
    csvRows.push(headers.join(","));

    // Datos
    orders.forEach((order) => {
      const row = [
        order.id,
        order.operatorContract || "",
        order.orderNumber || "",
        order.authorizationNumber || "",
        order.client || "",
        order.patientName || "",
        order.idCard || "",
        order.userPhone || "",
        order.email || "",
        order.creationDate || "",
        order.origin || "",
        order.destination || "",
        order.itinerary || "",
        order.quantity || "",
        order.travelDate || "",
        order.value || "",
        order.netValue || "",
        order.remarks || "",
        order.status || "",
        order.operator?.name || "",
      ];
      csvRows.push(row.join(","));
    });

    // Generar archivo CSV con BOM
    const csvContent = "\uFEFF" + csvRows.join("\n"); // Agrega el BOM al inicio del archivo
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };