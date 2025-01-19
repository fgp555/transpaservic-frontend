import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ticketService } from "../../../services/apiTicket";
import Swal from "sweetalert2";
import "./TicketByIdPage.css";

const TicketByIdPage = () => {
  const { id } = useParams(); // Obtener el ID del ticket desde la URL
  const [ticketData, setTicketData] = useState(null);

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

  if (!ticketData) {
    return (
      <div className="loading">
        <h2>Cargando...</h2>
      </div>
    );
  }

  return (
    <div className="TicketByIdPage">
      <h1>Detalles del Ticket</h1>
      <div className="ticket-details">
        <h3>Información del Ticket #{ticketData.id}</h3>
        <table>
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Contrato de transporte:</strong>
              </td>
              <td>{ticketData.transportContract}</td>
            </tr>
            <tr>
              <td>
                <strong>Número de orden:</strong>
              </td>
              <td>{ticketData.orderNumber}</td>
            </tr>
            <tr>
              <td>
                <strong>Diagnóstico principal:</strong>
              </td>
              <td>{ticketData.mainDiagnosis}</td>
            </tr>
            <tr>
              <td>
                <strong>Cliente:</strong>
              </td>
              <td>{ticketData.client}</td>
            </tr>
            <tr>
              <td>
                <strong>Nombre del paciente:</strong>
              </td>
              <td>{ticketData.patientName}</td>
            </tr>
            <tr>
              <td>
                <strong>ID del paciente:</strong>
              </td>
              <td>{ticketData.idCard}</td>
            </tr>
            <tr>
              <td>
                <strong>Teléfono del usuario:</strong>
              </td>
              <td>{ticketData.userPhone}</td>
            </tr>
            <tr>
              <td>
                <strong>Correo electrónico:</strong>
              </td>
              <td>{ticketData.email}</td>
            </tr>
            <tr>
              <td>
                <strong>Fecha de viaje:</strong>
              </td>
              <td>{ticketData.travelDate}</td>
            </tr>
            <tr>
              <td>
                <strong>Origen:</strong>
              </td>
              <td>{ticketData.origin}</td>
            </tr>
            <tr>
              <td>
                <strong>Destino:</strong>
              </td>
              <td>{ticketData.destination}</td>
            </tr>
            <tr>
              <td>
                <strong>Itinerario:</strong>
              </td>
              <td>{ticketData.itinerary}</td>
            </tr>
            <tr>
              <td>
                <strong>Cantidad:</strong>
              </td>
              <td>{ticketData.quantity}</td>
            </tr>
            <tr>
              <td>
                <strong>Valor:</strong>
              </td>
              <td>{ticketData.value}</td>
            </tr>
            <tr>
              <td>
                <strong>Valor neto:</strong>
              </td>
              <td>{ticketData.netValue}</td>
            </tr>
            <tr>
              <td>
                <strong>Cheque:</strong>
              </td>
              <td>{ticketData.check}</td>
            </tr>
            <tr>
              <td>
                <strong>Observaciones:</strong>
              </td>
              <td>{ticketData.remarks}</td>
            </tr>
            <tr>
              <td>
                <strong>Estado:</strong>
              </td>
              <td>{ticketData.status}</td>
            </tr>
            <tr>
              <td>
                <strong>Proveedor de transporte:</strong>
              </td>
              <td>{ticketData.transport}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketByIdPage;
