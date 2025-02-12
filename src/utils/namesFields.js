export const namesOrderFields = {
  id: "Id",
  operator: "Operador",
  orderNumber: "N° Orden",
  status: "Estado",
  patientName: "Paciente",
  idCard: "Cedula",
  userPhone: "Telefono",
  itinerary: "Itinerario",

  creationDate: "Fecha Solicitud",
  expirationDate: "Fecha Vigencia", //
  travelDate: "Fecha Tentativa",
  approvalDate: ["Fecha Cumplimiento", "Fecha Cumplimiento"],
  approvalTravelDate: ["Fecha Real Viaje", "Fecha Real Viaje"], //

  ticketNumber: "N° Ticket",
  quantity: ["Cant. Solic", "Cantidad Solicitada"],
  approvalQuantity: ["Cant. Usada", "Cantidad Usada"], //
  authorizationNumber: "N° Autorización",
  operatorContract: "N° Contrato",
  value: "Valor",
  netValue: "Valor Total",
  origin: "Origen",
  destination: "Destino",
  client: "Cliente",
  remarks: "Comentario",
  ticketImage: "Ticket Imagen",
  backticketHistory: "Back Ticket History",
  email: "Email", // optional
};

export const statusOrderNames = {
  pendiente: "Pendiente",
  aprobado: "Cumplido",
  cancelado: "Cancelado",
  expirado: "Expirado",
};

/*
 * Fecha emisión
 * Fecha probable de viaje.
 * Fecha cumplimento.
 * Fecha real de viaje.
 * Vencimiento. ( O vigencia )
 */
