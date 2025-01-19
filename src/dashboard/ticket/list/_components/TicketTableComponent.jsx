import React from "react";
import "./TicketTableComponent.css";
import { useSelector } from "react-redux";

const TicketTableComponent = ({ tickets, downloadCSV }) => {
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";

  return (
    <div className="TicketTableComponent">
      <br />
      <button onClick={downloadCSV} className="btn btn-primary mb-3">
        Descargar CSV
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Paciente</th>
            <th>Cedula</th>
            <th>Itinerario</th>
            <th>Operador</th>
            <th>F.Emision</th>
            <th>Contrato#</th>
            <th>Orden#</th>
            <th>Cliente</th>
            <th>F.Viaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.status || "N/A"}</td>
                <td>{ticket.patientName || "N/A"}</td>
                <td>{ticket.idCard || "N/A"}</td>
                <td>{ticket.itinerary || "N/A"}</td>
                <td>{ticket.transport?.name || "N/A"}</td>
                <td>{ticket.creationDate || "N/A"}</td>
                <td>{ticket.transportContract || "N/A"}</td>
                <td>{ticket.orderNumber || "N/A"}</td>
                <td>{ticket.client || "N/A"}</td>
                <td>{ticket.travelDate || "N/A"}</td>
                <td>
                  {isAdmin ? (
                    <>
                      {/* {(() => {
                        switch (ticket.status) {
                          case "aprobado":
                            return <i className="icon-toggle-on icon-status-aprobado"></i>;
                          case "pendiente":
                            return <i className="icon-toggle-off icon-status-pendiente" onClick={() => handleStatusClick(ticket.status)}></i>;
                          case "cancelado":
                            return <i className="icon-ban icon-status-cancelado"></i>;
                          default:
                            return null; // Opcional, por si llega un estado no esperado
                        }
                      })()} */}
                      <i className="icon-info"></i>
                      <i className="icon-pencil"></i>
                      <i className="icon-trash"></i>
                    </>
                  ) : (
                    <>{ticket.status === "pendiente" ? <button>Aprobar</button>:<button>Ver</button>}  </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No hay tickets disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTableComponent;
