import React, { useEffect, useState } from "react";
import { transportService } from "../../../services/apiTransport";
import { ticketService } from "../../../services/apiTicket";
import { useSelector } from "react-redux";

const TicketListPage = () => {
  const [ticketData, setTicketData] = useState([]);
  const userSlice = useSelector((state) => state.user);

  // Verifica si userSlice está vacío o no contiene datos válidos
  const isUserSliceValid = userSlice && Object.keys(userSlice).length > 0;
  const isAdmin = isUserSliceValid && userSlice.user?.role === "admin";
  const transportId = isUserSliceValid ? userSlice.user?.transport?.id : null;

  const fetchTickets = async () => {
    try {
      if (!isUserSliceValid) {
        console.warn("User data is not available. Skipping ticket fetch.");
        return; // Detiene la ejecución si no hay datos válidos de usuario
      }

      if (isAdmin) {
        // Si es admin, obtiene todos los tickets
        const response = await ticketService.getAll();
        setTicketData(response);
      } else if (transportId) {
        // Si no es admin y tiene un transportId, obtiene los tickets de un transporte específico
        const response = await transportService.findOne(transportId);
        setTicketData(response.tickets);
      }
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <h2>Ticket List</h2>
      {!isUserSliceValid ? (
        <p>No hay datos de usuario disponibles.</p>
      ) : (
        //
        <pre>{JSON.stringify(ticketData, null, 2)}</pre>
      )}
    </>
  );
};

export default TicketListPage;
