import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { transportService } from "../../../services/apiTransport";

const TransportDeletePage = () => {
  const [transportId, setTransportId] = useState("1"); // Estado para el ID del transporte
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Para redirigir después de eliminar

  const handleDelete = async () => {
    if (!transportId) {
      Swal.fire("Error", "Por favor, ingresa un ID de transporte", "error");
      return;
    }

    setLoading(true); // Mostrar estado de carga

    try {
      const response = await transportService.delete(transportId); // Llamar al servicio para eliminar
      Swal.fire("Éxito", "Transporte eliminado correctamente", "success");
      console.log("Transporte eliminado:", response);
      navigate("/transport/list"); // Redirigir a la lista de transportes
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire("Error", error.response.data.message, "error");
      } else {
        Swal.fire("Error", "Hubo un problema al eliminar el transporte", "error");
      }
      console.error("Error deleting transport:", error);
    } finally {
      setLoading(false); // Terminar estado de carga
    }
  };

  const handleCancel = () => {
    navigate("/transport/list"); // Redirigir si se cancela
  };

  return (
    <div>
      <h2>Eliminar Transporte</h2>
      <div>
        <label htmlFor="transportId">ID del Transporte:</label>
        <input
          type="number"
          id="transportId"
          placeholder="Ingresa el ID del transporte"
          value={transportId}
          onChange={(e) => setTransportId(e.target.value)} // Actualizar el estado
        />
      </div>
      <div>
        <button onClick={handleDelete} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default TransportDeletePage;
