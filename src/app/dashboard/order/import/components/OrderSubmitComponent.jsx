import React, { useState, useEffect } from "react";
import "./OrderSubmitComponent.css";
import { orderService } from "../../../../../services/apiOrder";
import Swal from "sweetalert2";

const OrderSubmitComponent = ({ filteredDataWithoutDuplicates }) => {
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [duplicates, setDuplicates] = useState({});
  const [dataToSendWithoutId, setDataToSendWithoutId] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  useEffect(() => {
    const updatedData = filteredDataWithoutDuplicates.map(({ id, ...rest }) => rest);
    setDataToSendWithoutId(updatedData);
  }, [filteredDataWithoutDuplicates]);

  const handleSubmit = async () => {
    if (!dataToSendWithoutId || dataToSendWithoutId.length === 0) {
      setDuplicateMessage("No hay datos para enviar.");
      return;
    }

    setIsLoading(true); // Activar loading

    try {
      const response = await orderService.saveArrayData(dataToSendWithoutId);

      console.log("Datos enviados correctamente:", response);

      // Mostrar SweetAlert2 solo cuando el envío sea exitoso
      Swal.fire({
        icon: "success",
        title: "¡Datos enviados correctamente!",
        text: "Los datos han sido procesados y guardados con éxito.",
      });

      // Limpiar mensajes de error de duplicados si la solicitud es exitosa
      setDuplicateMessage("");
      setDuplicates({});
    } catch (error) {
      if (error.duplicates) {
        // Si hay duplicados, se muestran los duplicados en la UI
        setDuplicateMessage(error.message || "Se han detectado entradas duplicadas.");
        setDuplicates(error.duplicates);
      } else {
        console.error("Error al enviar los datos:", error);
        setDuplicateMessage("Hubo un error al enviar los datos.");
      }
    } finally {
      setIsLoading(false); // Desactivar loading después de la petición
    }
  };

  return (
    <div className="OrderSubmitComponent">
      <button
        onClick={handleSubmit}
        className={`btn btn-primary LoadingButton ${isLoading ? "loadingProgress" : ""}`}
        disabled={isLoading}
        //
      >
        {isLoading ? (
          <>
            <span className="spinnerLoop"></span>Enviando...
          </>
        ) : (
          "Enviar a la base de datos"
        )}
      </button>

      {duplicateMessage && (
        <div className="error-message">
          <p>{duplicateMessage}</p>
          {duplicates.operatorContract && (
            <p>
              <strong>Contrato de operador Duplicados:</strong> {duplicates.operatorContract.join(", ")}
            </p>
          )}
          {duplicates.orderNumber && (
            <p>
              <strong>Numero Orden Duplicados:</strong> {duplicates.orderNumber.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSubmitComponent;
