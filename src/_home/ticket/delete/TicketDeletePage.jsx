import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ticketService } from "../../../services/apiTicket";

const TicketDeletePage = () => {
  const navigate = useNavigate(); // Usar `useNavigate` en lugar de `useHistory`
  const [ticketId, setTicketId] = useState("1"); // Estado para almacenar el ID del ticket
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!ticketId) {
      Swal.fire("Error", "Por favor, ingresa un ID de ticket", "error");
      return;
    }

    setLoading(true); // Iniciar el estado de carga mientras se elimina el ticket

    try {
      const response = await ticketService.delete(ticketId); // Llamar al servicio para eliminar el ticket
      Swal.fire("Éxito", "Ticket eliminado exitosamente", "success");
      console.log("Ticket eliminado:", response);
      navigate("/ticket/list"); // Redirigir a la lista de tickets
    } catch (error) {
      // Verificar si la respuesta contiene un mensaje del servidor
      const errorMessage = error.response?.data?.message || "Hubo un error al eliminar el ticket";
      Swal.fire("Error", errorMessage, "error");
      console.error("Error deleting ticket:", error);
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  const handleCancel = () => {
    navigate("/ticket/list"); // Redirigir a la lista de tickets si el usuario cancela
  };

  return (
    <div>
      <h2>Eliminar Ticket</h2>
      <p>¿Estás seguro de que deseas eliminar este ticket?</p>
      <div>
        <input
          type="number"
          placeholder="Ingresa el ID del ticket"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)} // Actualizar el estado con el ID ingresado
        />
      </div>
      <div>
        <button onClick={handleDelete} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar Ticket"}
        </button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default TicketDeletePage;
