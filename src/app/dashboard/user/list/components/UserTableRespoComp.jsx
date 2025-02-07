import React from "react";
import "./UserTableRespoComp.css";
import { NavLink } from "react-router";
import Swal from "sweetalert2"; // Para mostrar alertas
import { apiUserService } from "../../../../../services/apiUser";

export const UserTableRespoComp = ({ data, fetchUsers }) => {
  const handleDelete = async (ItemId) => {
    if (!ItemId) {
      // Si no se ingresa un id, mostramos un error
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un ID de usuario válido.",
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
        // Llamada a la API para eliminar el usuario
        await apiUserService.deleteUser(ItemId);

        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Usuario eliminado!",
          text: "El usuario ha sido eliminado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Limpiar el campo después de eliminar
      } catch (error) {
        // Si el error es 404 (usuario no encontrado), lo mostramos
        if (error.response && error.response.status === 404) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message || "Usuario no encontrado.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          // En caso de otro error, mostrar un mensaje genérico
          Swal.fire({
            title: "Error",
            text: error.message || "Hubo un error al eliminar el usuario.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } finally {
        console.log("Cerrando loading");
        fetchUsers();
      }
    }
  };

  return (
    <div className="UserTableRespoComp">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>WhatsApp</th>
            <th>Rol</th>
            <th>Operador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td data-label="Nombre">{`${item.firstName} ${item.lastName ? item.lastName : ""}`}</td>
              <td data-label="Correo">{item.email}</td>
              <td data-label="WhatsApp">{item.whatsapp}</td>
              <td data-label="Rol">{item.role === "admin" ? "Administrador" : "Usuario"}</td>
              <td data-label="Operador">{item.operator?.name || "N/A"}</td>
              <td data-label="Acciones">
                <div className="actions">
                  <NavLink to={`/dashboard/user/update/${item.id}`}>
                    <i className="icon-pencil"></i>
                  </NavLink>
                  <i className="icon-trash" onClick={() => handleDelete(item.id)}></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
