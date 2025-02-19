import "./OrderSubmitComponent.css";
import { orderService } from "../../../../../services/apiOrder";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const OrderSubmitComponent = ({ filteredDataWithoutDuplicates }) => {
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [duplicates, setDuplicates] = useState({});
  const [dataToSendWithoutId, setDataToSendWithoutId] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true); // Estado del checkbox

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
      const payload = {
        data: dataToSendWithoutId,
        sendToWhatsApp, // Incluir opción de envío a WhatsApp
      };

      const response = await orderService.saveArrayData(payload);

      if (response.error) {
        throw new Error(response.error); // Forzar el catch si hay error
      }

      console.log("Datos enviados correctamente:", response);

      Swal.fire({
        icon: "success",
        title: "¡Datos enviados correctamente!",
        text: "Los datos han sido procesados y guardados con éxito.",
      });

      setDuplicateMessage("");
      setDuplicates({});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setDuplicateMessage(error.message);

      Swal.fire({
        icon: "error",
        title: "Error al enviar los datos",
        text: error.message,
      });
    } finally {
      setIsLoading(false); // Desactivar loading después de la petición
    }
  };

  return (
    <div className="OrderSubmitComponent">
      <button onClick={handleSubmit} className={`btn btn-primary LoadingButton ${isLoading ? "loadingProgress" : ""}`} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinnerLoop"></span>Enviando...
          </>
        ) : (
          "Enviar a la base de datos"
        )}
      </button>
      <label className="checkbox-container">
        <input type="checkbox" checked={sendToWhatsApp} onChange={(e) => setSendToWhatsApp(e.target.checked)} />
        {sendToWhatsApp ? "Habilitado" : "Deshabilitado"} para envíos a WhatsApp
      </label>
      {duplicateMessage && (
        <div className="error-message">
          <p>{duplicateMessage}</p>
          {duplicates.operatorContract && (
            <p>
              <strong>Contrato de operador...</strong>
            </p>
          )}
        </div>
      )}
      {/* <pre>{JSON.stringify(dataToSendWithoutId,null,2)}</pre> */}
    </div>
  );
};

export default OrderSubmitComponent;
