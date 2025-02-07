import "./OrderTableRespoComp.css"; // Asegúrate de incluir un archivo CSS con estilos adecuados
import { NavLink } from "react-router";
import { orderService } from "../../../../../services/apiOrder";
import { useSelector } from "react-redux";
import React from "react";
import Swal from "sweetalert2"; // Para mostrar alertas

export const OrderTableRespoComp = ({ data, fetchOrders }) => {
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";

  const handleDelete = async (orderId) => {
    if (!orderId) {
      // Si no se ingresa un id, mostramos un error
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un ID de order válido.",
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
        // Llamada a la API para eliminar el order
        await orderService.delete(orderId);

        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Order eliminado!",
          text: "El order ha sido eliminado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Recargar los orders después de eliminar
        fetchOrders();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "Hubo un error al eliminar el order.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="OrderTableRespoComp">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <table>
        <thead>
          <tr>
            <th>Orden#</th>
            <th>Paciente</th>
            <th>Itinerario</th>
            <th>F. Viaje</th>
            {/* <th>Valor</th> */}
            <th>Estado</th>
            <th>Operador</th>
            <th>
              <i className="fa-solid fa-clock-rotate-left"></i>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index}>
              <td data-label="Order ID">{order.orderNumber}</td>
              <td data-label="Paciente">{order.patientName}</td>
              <td data-label="Destino">{order.itinerary}</td>
              <td data-label="F. Viaje"> {new Date(order.travelDate).toISOString().split("T")[0]}</td>
              {/* <td data-label="Valor">{order.value}</td> */}
              {/* <td data-label="Estado">{order.status}</td> */}
              <td data-label="Estado" className="TicketStatus">
                {order.status === "pendiente" && <span className="pendiente">Pendiente</span>}
                {order.status === "aprobado" && <span className="aprobado">Aprobado</span>}
                {order.status === "cancelado" && <span className="cancelado">Cancelado</span>}
              </td>
              <td data-label="Operador">{order.operator?.name || "N/A"}</td>
              <td data-label="Backticket">{order.backticketHistory?.length || "0"}</td>
              <td data-label="Acciones" className="actions">
                {isAdmin ? (
                  <span className="actions-container">
                    <NavLink to={`/dashboard/order/detail/${order.orderNumber}`}>
                      <i className="fa-regular fa-eye"></i>
                    </NavLink>
                    <NavLink to={`/dashboard/order/backticket/${order.orderNumber}`}>
                      <i className="fa-solid fa-clock-rotate-left"></i>
                    </NavLink>
                    {/* <NavLink to={`/dashboard/order/update/${order.id}`}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </NavLink> */}
                    <span>
                      <i className="fa-regular fa-trash-can" onClick={() => handleDelete(order.id)}></i>
                    </span>
                  </span>
                ) : (
                  <>
                    {order.status === "pendiente" ? (
                      <NavLink to={`/dashboard/order/detail/${order.id}`}>
                        <span className="btn btn-primary">Aprobar</span>
                      </NavLink>
                    ) : (
                      <NavLink to={`/dashboard/order/detail/${order.id}`}>
                        <span className="btn btn-primary">Ver</span>
                      </NavLink>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};
