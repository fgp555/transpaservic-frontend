import React, { useState } from "react";
// import { ticketService } from "../../../services/apiTransport";
import Swal from "sweetalert2";
import { ticketService } from "../../../services/apiTicket";

const TicketCreatePage = () => {
  const [formData, setFormData] = useState({
    transportContract: "100002",
    orderNumber: "2000002",
    mainDiagnosis: "Hypertension",
    client: "Demo Client",
    patientName: "David Lopez",
    idCard: "79688623",
    origin: "Bucaramanga",
    destination: "Yopal",
    itinerary: "Bucaramanga-Yopal",
    quantity: 2,
    remarks: "Testing remarks",
    travelDate: "2024-08-30",
    email: "demo@example.com",
    creationDate: new Date().toISOString().split("T")[0], // Fecha actual
    check: "Verified",
    value: 60000,
    netValue: 120000,
    serviceProvider: "Motilones Transport",
    userPhone: "3124163032",
    transport: { id: 1 }, // ID del transporte por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ticketService.create(formData);
      Swal.fire("Éxito", "Ticket creado exitosamente", "success");
      console.log("Ticket creado:", response);
    } catch (error) {
      if (error.response) {
        // Manejar errores enviados desde el servidor
        const { status, data } = error.response;

        if (status === 409) {
          Swal.fire("Conflicto", data.message || "Entrada duplicada detectada", "error");
        } else if (status === 400) {
          Swal.fire("Error de validación", data.message || "Datos inválidos", "error");
        } else {
          Swal.fire("Error", data.message || "Error inesperado en el servidor", "error");
        }
      } else if (error.request) {
        // Errores de red o servidor no responde
        Swal.fire("Error de red", "No se pudo contactar con el servidor. Intenta más tarde.", "error");
      } else {
        // Otros errores (por ejemplo, errores de configuración en Axios)
        Swal.fire("Error", "Ocurrió un error inesperado", "error");
      }

      console.error("Error al crear el ticket:", error);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="transportContract" placeholder="Transport Contract" value={formData.transportContract} onChange={handleChange} required />
        <input type="text" name="orderNumber" placeholder="Order Number" value={formData.orderNumber} onChange={handleChange} required />
        <input type="text" name="mainDiagnosis" placeholder="Main Diagnosis" value={formData.mainDiagnosis} onChange={handleChange} />
        <input type="text" name="client" placeholder="Client" value={formData.client} onChange={handleChange} />
        <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} required />
        <input type="text" name="idCard" placeholder="ID Card" value={formData.idCard} onChange={handleChange} required />
        <input type="text" name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} />
        <input type="date" name="travelDate" placeholder="Travel Date" value={formData.travelDate} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="check" placeholder="Check" value={formData.check} onChange={handleChange} />
        <input type="number" name="value" placeholder="Value" value={formData.value} onChange={handleChange} />
        <input type="number" name="netValue" placeholder="Net Value" value={formData.netValue} onChange={handleChange} />
        <input type="text" name="serviceProvider" placeholder="Service Provider" value={formData.serviceProvider} onChange={handleChange} />
        <input type="text" name="userPhone" placeholder="User Phone" value={formData.userPhone} onChange={handleChange} />
        <br />
        <br />
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketCreatePage;
