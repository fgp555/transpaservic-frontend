import React from "react";
import "./OperatorTableRespoComp.css";
import { NavLink } from "react-router-dom"; // Asegúrate de usar la versión correcta de React Router
import { operatorService } from "../../../../../services/apiOperator";
import Swal from "sweetalert2"; // Para mostrar alertas

export const OperatorTableRespoComp = ({ data, fetchOperators }) => {
  const handleDelete = async (operatorId) => {
    if (!operatorId) {
      // Si no se ingresa un id, mostramos un error
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un ID de operador válido.",
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
        // Llamada a la API para eliminar el operador
        await operatorService.delete(operatorId);

        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Operador eliminado!",
          text: "El operador ha sido eliminado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Limpiar el campo después de eliminar
      } catch (error) {
        // Si el error es 404 (operador no encontrado), lo mostramos
        if (error.response && error.response.status === 404) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message || "Operador no encontrado.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          // En caso de otro error, mostrar un mensaje genérico
          Swal.fire({
            title: "Error",
            text: error.message || "Hubo un error al eliminar el operador.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } finally {
        console.log("Cerrando loading");
        fetchOperators(); // Refrescar la lista de operadors
      }
    }
  };

  return (
    <div className="OperatorTableRespoComp">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>WhatsApp</th>
            <th>Correo</th>
            <th>Sitio Web</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((item) => (
            <tr key={item.id}>
              <td data-label="Nombre">{item.name}</td>
              <td data-label="WhatsApp">{item.whatsapp}</td>
              <td data-label="Correo">{item.email}</td>
              <td data-label="Sitio Web">
                <a href={item.website} target="_blank" rel="noopener noreferrer">
                  {item.website}
                </a>
              </td>
              <td data-label="Acciones" className="actions">
                <NavLink to={`/dashboard/operator/update/${item.id}`}>
                  <i className="icon-pencil"></i>
                </NavLink>
                <i className="icon-trash" onClick={() => handleDelete(item.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
