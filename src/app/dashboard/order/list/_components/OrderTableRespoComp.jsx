import React from "react";
import "./OrderTableRespoComp.css"; // Asegúrate de incluir un archivo CSS con estilos adecuados
import { NavLink } from "react-router";
import Swal from "sweetalert2"; // Para mostrar alertas
import { orderService } from "../../../../../services/apiOrder";
import { useSelector } from "react-redux";

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
      <table>
        <thead>
          <tr>
            <th>Orden#</th>
            <th>Cliente</th>
            <th>Itinerario</th>
            <th>F. Emision</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Operador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index}>
              <td data-label="Order ID">{order.orderNumber}</td>
              <td data-label="Cliente">{order.client}</td>
              <td data-label="Destino">{order.itinerary}</td>
              <td data-label="F. Emision"> {new Date(order.creationDate).toISOString().split('T')[0]}</td>
              <td data-label="Valor">{order.value}</td>
              {/* <td data-label="Estado">{order.status}</td> */}
              <td data-label="Estado" className="TicketStatus">
                {order.status === "pendiente" && <span className="pendiente">Pendiente</span>}
                {order.status === "aprobado" && <span className="aprobado">Aprobado</span>}
                {order.status === "cancelado" && <span className="cancelado">Cancelado</span>}
              </td>
              <td data-label="Operador">{order.operator?.name || "N/A"}</td>
              <td data-label="Acciones" className="actions">
                {isAdmin ? (
                  <>
                    <NavLink to={`/dashboard/order/${order.id}`}>
                      <i className="icon-eye"></i>
                    </NavLink>
                    <NavLink to={`/dashboard/order/update/${order.id}`}>
                      <i className="icon-pencil"></i>
                    </NavLink>
                    <i className="icon-trash" onClick={() => handleDelete(order.id)}></i>
                  </>
                ) : (
                  <>
                    {order.status === "pendiente" ? (
                      // dashboard/order/approve/:id
                      <NavLink to={`/dashboard/order/${order.id}`}>
                        <span className="btn btn-primary">Aprobar</span>
                      </NavLink>
                    ) : (
                      <NavLink to={`/dashboard/order/${order.id}`}>
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
