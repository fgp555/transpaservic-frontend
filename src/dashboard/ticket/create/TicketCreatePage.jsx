import React, { useEffect, useState } from "react";
// import { ticketService } from "../../../services/apiTransport";
import Swal from "sweetalert2";
import { ticketService } from "../../../services/apiTicket";
import FindMunicipalityComponent from "./components/findMunicipalityComponent";
import FindTransportComponent from "./components/FindTransportComponent";
import './TicketCreatePage.css';

const TicketCreatePage = () => {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [errors, setErrors] = useState({ origin: false, destination: false });
  const [formData, setFormData] = useState({
    transportContract: "100002",
    orderNumber: "2000002", 
    mainDiagnosis: "abc",
    client: "NEPS",
    patientName: "David Lopez Mendoza",
    idCard: "79688623",
    origin: "",
    destination: "",
    itinerary: "Bucaramanga-Yopal",
    quantity: 2,
    remarks: "Testing remarks",
    // travelDate: "",
    email: "demo@example.com",
    creationDate: new Date().toISOString().split("T")[0],
    check: "abc",
    value: 60000,
    netValue: 120000,
    serviceProvider: "Motilones Transport",
    countryCode: "+57",
    userPhone: "3124163032",
    transport: { id: null },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  // Actualizamos 'itinerary' dinámicamente cuando cambian 'origin' o 'destination'
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      itinerary: `${prev.origin} - ${prev.destination}`,
    }));
  }, [formData.origin, formData.destination]); // Dependencias: se ejecuta cuando cambian origin o destination

  // Actualizar netValue cuando cambian value o quantity
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      netValue: prev.value * prev.quantity, // Calculamos netValue
    }));
  }, [formData.value, formData.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const newErrors = {
      origin: !formData.origin,
      destination: !formData.destination,
      transport: !formData.transport.id,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      Swal.fire("Error", "Por favor, completa todos los campos requeridos", "error");
      return;
    }

    // Combinar código de país y número de teléfono antes de enviar los datos
    const fullPhoneNumber = `${formData.countryCode}${formData.userPhone}`;
    const updatedFormData = { ...formData, userPhone: fullPhoneNumber };

    try {
      const response = await ticketService.create(updatedFormData);
      Swal.fire("Éxito", "Ticket creado exitosamente", "success");
      console.log("Ticket creado:", response);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          Swal.fire("Conflicto", data.message || "Entrada duplicada detectada", "error");
        } else if (status === 400) {
          Swal.fire("Error de validación", data.message || "Datos inválidos", "error");
        } else {
          Swal.fire("Error", data.message || "Error inesperado en el servidor", "error");
        }
      } else if (error.request) {
        Swal.fire("Error de red", "No se pudo contactar con el servidor. Intenta más tarde.", "error");
      } else {
        Swal.fire("Error", "Ocurrió un error inesperado", "error");
      }

      console.error("Error al crear el ticket:", error);
    }
  };

  const handleCitySelect = (field, city) => {
    setFormData((prev) => ({
      ...prev,
      [field]: city,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: false, // Limpiar el error cuando selecciona una ciudad
    }));
  };

  // Actualizar el transporte seleccionado
  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
    setFormData((prev) => ({
      ...prev,
      transport: { id: transport.id },
    }));
    setErrors((prev) => ({
      ...prev,
      transport: false, // Limpiar el error al seleccionar un transporte
    }));
  };

  return (
    <div className="TicketCreatePage">
      <h2>Crear Orden</h2>
      <form /* onSubmit={handleSubmit} */>
        <div>
          {/* ========== Información Básica ========== */}
          <h2>Información Básica</h2>
        </div>
        <div>
          <label htmlFor="transportContract">Contrato de Transporte No</label>
          <input type="text" id="transportContract" name="transportContract" value={formData.transportContract} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="orderNumber">Número de Orden</label>
          <input type="text" id="orderNumber" name="orderNumber" value={formData.orderNumber} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="mainDiagnosis">Diagnóstico Principal</label>
          <input type="text" id="mainDiagnosis" name="mainDiagnosis" value={formData.mainDiagnosis} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="client">Cliente</label>
          <input type="text" id="client" name="client" value={formData.client} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="patientName">Nombre del Paciente</label>
          <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="idCard">Cédula de Identidad</label>
          <input type="text" id="idCard" name="idCard" value={formData.idCard} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="countryCode">Código de País</label>
          <input type="text" id="countryCode" name="countryCode" placeholder="+52" value={formData.countryCode || ""} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="userPhone">Celular No</label>
          <input type="text" id="userPhone" name="userPhone" value={formData.userPhone} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="creationDate">Fecha de Emision</label>
          <input type="date" id="creationDate" name="creationDate" value={formData.creationDate} onChange={handleChange} disabled required />
        </div>

        <div>
          {/* ========== Información de Viaje ========== */}
          <h2>Información de Viaje</h2>
        </div>

        <div>
          <FindTransportComponent onTransportSelect={handleTransportSelect} />
          {errors.transport && <p style={{ color: "red" }}>El transporte es obligatorio</p>}
        </div>

        <div>
          <label>Origen</label>
          <FindMunicipalityComponent onCitySelect={(city) => handleCitySelect("origin", city)} />
          {errors.origin && <span style={{ color: "red" }}>Se requiere origen</span>}
        </div>
        <div>
          <label>Destino</label>
          <FindMunicipalityComponent onCitySelect={(city) => handleCitySelect("destination", city)} />
          {errors.destination && <span style={{ color: "red" }}>Se requiere destino</span>}
        </div>

        <div>
          <label htmlFor="itinerary">Itinerario</label>
          <input type="text" id="itinerary" name="itinerary" value={formData.itinerary} onChange={handleChange} disabled />
        </div>

        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="value">Valor</label>
          <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="netValue">Valor Total</label>
          <input type="number" id="netValue" name="netValue" value={formData.netValue} onChange={handleChange} disabled />
        </div>

        <div>
          <label htmlFor="travelDate">Fecha de Viaje</label>
          <input type="date" id="travelDate" name="travelDate" value={formData.travelDate} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="check">Chequeo</label>
          <input type="text" id="check" name="check" value={formData.check} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="remarks">Observaciones</label>
          <br />
          <textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
        </div>

        <br />
        <button type="button" onClick={handleSubmit}>
          Crear Orden
        </button>
      </form>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
};

export default TicketCreatePage;
