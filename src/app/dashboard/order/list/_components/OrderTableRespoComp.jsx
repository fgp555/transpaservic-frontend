import "./OrderTableRespoComp.css"; // Asegúrate de incluir un archivo CSS con estilos adecuados
import { NavLink, useNavigate } from "react-router";
import { orderService } from "../../../../../services/apiOrder";
import { useSelector } from "react-redux";
import React from "react";
import Swal from "sweetalert2"; // Para mostrar alertas
import { namesOrderFields } from "../../../../../utils/namesFields";
import { formatDate, formatDateISO } from "../../utils/OrderComp";

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

  const navigate = useNavigate();

  return (
    <div className="OrderTableRespoComp">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <table>
        <thead>
          <tr>
            <th>{namesOrderFields.orderNumber}</th>
            <th>{namesOrderFields.patientName}</th>
            <th>{namesOrderFields.idCard}</th>
            <th>{namesOrderFields.itinerary}</th>
            <th>{namesOrderFields.creationDate}</th>
            <th>{namesOrderFields.approvalTravelDate[0]}</th>
            <th>{namesOrderFields.approvalDate[0]}</th>
            <th>Operador</th>
            <th>{namesOrderFields.ticketNumber}</th>
            <th>{namesOrderFields.quantity[0]}</th>
            <th>{namesOrderFields.approvalQuantity[0]}</th>
            <th>
              <i class="fa-solid fa-square-check"></i>
            </th>
            {isAdmin && (
              <>
                <th>
                  <i className="fa-solid fa-power-off"></i>
                </th>
                <th>Acciones</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/dashboard/order/detail/${order.orderNumber}`)}
              style={{ cursor: "pointer" }}
              //
            >
              <td data-label="Order #" className="OrderStatusTable">
                {order.status === "pendiente" && <i class="fa-solid fa-stopwatch pendiente"></i>}
                {order.status === "aprobado" && <i class="fa-solid fa-circle-check aprobado"></i>}
                {order.status === "cancelado" && <i class="fa-solid fa-ban cancelado"></i>}
                {order.status === "expirado" && <i class="fa-solid fa-power-off expirado"></i>}{" "}
                <NavLink to={`/dashboard/order/detail/${order.orderNumber}`} className={order.status}>
                  {order.orderNumber}
                </NavLink>
              </td>
              <td data-label="Paciente">{order.patientName}</td>
              <td data-label="Cedula">{order.idCard}</td>
              <td data-label="Destino">{order.itinerary}</td>

              <td data-label="F. Emision">{formatDateISO(order.creationDate)}</td>
              <td data-label="F. Viaje">{order.approvalTravelDate || "—"}</td>
              <td>{formatDate(order.approvalDate)}</td>

              <td data-label="Operador">{order.operator?.name || "—"}</td>
              <td data-label="N° Ticket">{order.ticketNumber || "—"}</td>
              <td data-label="C.Solicitada">{order.quantity || "—"}</td>
              <td data-label="C.Usada">{order.approvalQuantity || "—"}</td>
              <td data-label="Estado" className="OrderStatusTable">
                {order.status === "pendiente" && <i class="fa-solid fa-stopwatch pendiente"></i>}
                {order.status === "aprobado" && <i class="fa-solid fa-circle-check aprobado"></i>}
                {order.status === "cancelado" && <i class="fa-solid fa-ban cancelado"></i>}
                {order.status === "expirado" && <i class="fa-solid fa-power-off expirado"></i>}
              </td>
              {isAdmin && (
                <>
                  <td
                    data-label="Backticket"
                    onClick={(event) => event.stopPropagation()} // Evita que la fila redirija al hacer clic en "Acciones"
                  >
                    <NavLink to={`/dashboard/order/backticket/${order.orderNumber}`}>
                      {order.backticketHistory?.length || "0"}
                      {/*  */}
                    </NavLink>
                  </td>

                  <td
                    data-label="Acciones"
                    className="actions"
                    onClick={(event) => event.stopPropagation()} // Evita que la fila redirija al hacer clic en "Acciones"
                  >
                    <span className="actions-container">
                      <NavLink /* to={`/dashboard/order/update/${order.id}`} */>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </NavLink>
                      <span>
                        <i className="fa-regular fa-trash-can" onClick={() => handleDelete(order.id)}></i>
                      </span>
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};
