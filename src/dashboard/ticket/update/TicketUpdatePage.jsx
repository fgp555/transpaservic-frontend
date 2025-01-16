import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ticketService } from "../../../services/apiTicket";

const TicketUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID del ticket desde la URL
  const [ticketData, setTicketData] = useState({
    transportContract: "",
    orderNumber: "",
    mainDiagnosis: "",
    client: "",
    patientName: "",
    idCard: "",
    origin: "",
    destination: "",
    itinerary: "",
    quantity: 1,
    remarks: "",
    travelDate: "",
    email: "",
    check: "",
    value: 0,
    netValue: 0,
    serviceProvider: "",
    userPhone: "",
  });

  // Cargar los datos del ticket al montar el componente
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await ticketService.getById(id); // Suponiendo que tienes un método `getById` en ticketService
        setTicketData(ticket);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el ticket", "error");
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ticketService.update(id, ticketData);
      Swal.fire("Éxito", "Ticket actualizado exitosamente", "success");
      console.log("Ticket actualizado:", response);
    } catch (error) {
      Swal.fire("Error", "Hubo un error actualizando el ticket", "error");
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transportContract">Contrato de transporte</label>
          <input type="text" id="transportContract" name="transportContract" value={ticketData.transportContract} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="orderNumber">Número de orden</label>
          <input type="text" id="orderNumber" name="orderNumber" value={ticketData.orderNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="mainDiagnosis">Diagnóstico principal</label>
          <input type="text" id="mainDiagnosis" name="mainDiagnosis" value={ticketData.mainDiagnosis} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="client">Cliente</label>
          <input type="text" id="client" name="client" value={ticketData.client} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="patientName">Nombre del paciente</label>
          <input type="text" id="patientName" name="patientName" value={ticketData.patientName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="idCard">ID del paciente</label>
          <input type="text" id="idCard" name="idCard" value={ticketData.idCard} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="origin">Origen</label>
          <input type="text" id="origin" name="origin" value={ticketData.origin} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="destination">Destino</label>
          <input type="text" id="destination" name="destination" value={ticketData.destination} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="itinerary">Itinerario</label>
          <input type="text" id="itinerary" name="itinerary" value={ticketData.itinerary} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input type="number" id="quantity" name="quantity" value={ticketData.quantity} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="remarks">Observaciones</label>
          <textarea id="remarks" name="remarks" value={ticketData.remarks} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="travelDate">Fecha de viaje</label>
          <input type="date" id="travelDate" name="travelDate" value={ticketData.travelDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" value={ticketData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="check">Cheque</label>
          <input type="text" id="check" name="check" value={ticketData.check} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input type="number" id="value" name="value" value={ticketData.value} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="netValue">Valor neto</label>
          <input type="number" id="netValue" name="netValue" value={ticketData.netValue} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="serviceProvider">Proveedor de servicio</label>
          <input type="text" id="serviceProvider" name="serviceProvider" value={ticketData.serviceProvider} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userPhone">Teléfono del usuario</label>
          <input type="text" id="userPhone" name="userPhone" value={ticketData.userPhone} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default TicketUpdatePage;
