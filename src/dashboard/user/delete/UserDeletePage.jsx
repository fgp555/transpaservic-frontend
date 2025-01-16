import React, { useState } from "react";
import Swal from "sweetalert2"; // Para mostrar alertas
import { apiUserService } from "../../../services/apiUser"; // Ajusta la ruta a tu servicio API

const UserDeletePage = () => {
  const [userId, setUserId] = useState("1"); // Almacenamos el id ingresado
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId) {
      // Si no se ingresa un id, mostramos un error
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un ID de usuario válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    try {
      // Llamada a la API para eliminar el usuario
      await apiUserService.deleteUser(userId);

      // Mostrar alerta de éxito
      Swal.fire({
        title: "¡Usuario eliminado!",
        text: "El usuario ha sido eliminado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar el campo después de eliminar
      setUserId("");
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
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      <p>Ingresa el ID del usuario que deseas eliminar:</p>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} // Actualizamos el estado cuando el input cambia
        placeholder="ID del usuario"
      />
      <button onClick={handleDelete} disabled={loading || !userId}>
        {loading ? "Eliminando..." : "Eliminar Usuario"}
      </button>
    </div>
  );
};

export default UserDeletePage;
