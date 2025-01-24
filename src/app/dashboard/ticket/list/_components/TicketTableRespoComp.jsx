import React from "react";
import "./TicketTableRespoComp.css"; // Asegúrate de incluir un archivo CSS con estilos adecuados
import { NavLink } from "react-router";
import Swal from "sweetalert2"; // Para mostrar alertas
import { ticketService } from "../../../../../services/apiTicket";
import { useSelector } from "react-redux";

export const TicketTableRespoComp = ({ data, fetchTickets }) => {
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";

  const handleDelete = async (ticketId) => {
    if (!ticketId) {
      // Si no se ingresa un id, mostramos un error
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un ID de ticket válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Confirmar si desea eliminar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // Llamada a la API para eliminar el ticket
        await ticketService.delete(ticketId);

        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Ticket eliminado!",
          text: "El ticket ha sido eliminado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Recargar los tickets después de eliminar
        fetchTickets();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "Hubo un error al eliminar el ticket.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="TicketTableRespoComp">
      <table>
        <thead>
          <tr>
            <th>Orden#</th>
            <th>Cliente</th>
            <th>Itinerario</th>
            <th>F. Viaje</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Operador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket, index) => (
            <tr key={index}>
              <td data-label="Ticket ID">{ticket.orderNumber}</td>
              <td data-label="Cliente">{ticket.client}</td>
              <td data-label="Destino">{ticket.itinerary}</td>
              <td data-label="Fecha de Viaje">{ticket.travelDate}</td>
              <td data-label="Valor">{ticket.value}</td>
              <td data-label="Estado">{ticket.status}</td>
              <td data-label="Operador">{ticket.transport?.name || "N/A"}</td>
              <td data-label="Acciones" className="actions">
                {isAdmin ? (
                  <>
                    <NavLink to={`/dashboard/ticket/${ticket.id}`}>
                      <i className="icon-eye"></i>
                    </NavLink>
                    <NavLink to={`/dashboard/ticket/update/${ticket.id}`}>
                      <i className="icon-pencil"></i>
                    </NavLink>
                    <i className="icon-trash" onClick={() => handleDelete(ticket.id)}></i>
                  </>
                ) : (
                  <>
                    {ticket.status === "pendiente" ? (
                      // dashboard/ticket/approve/:id
                      <NavLink to={`/dashboard/ticket/approve/${ticket.id}`}>
                        <span className="btn btn-primary">Aprobar</span>
                      </NavLink>
                    ) : (
                      <NavLink to={`/dashboard/ticket/${ticket.id}`}>
                        {/* <i className="icon-eye"></i> */}
                        <span className="btn btn-secondary">Ver</span>
                      </NavLink>
                    )}{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
