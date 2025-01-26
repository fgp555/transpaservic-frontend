import React, { useState, useEffect } from "react";
import "./TicketSubmitComponent.css";
import { ticketService } from "../../../../../services/apiTicket";
import Swal from "sweetalert2";

const TicketSubmitComponent = ({ filteredDataWithoutDuplicates }) => {
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [duplicates, setDuplicates] = useState({});
  const [dataToSendWithoutId, setDataToSendWithoutId] = useState([]);

  useEffect(() => {
    const updatedData = filteredDataWithoutDuplicates.map(({ id, ...rest }) => rest);
    setDataToSendWithoutId(updatedData);
  }, [filteredDataWithoutDuplicates]);

  const handleSubmit = async () => {
    if (!dataToSendWithoutId || dataToSendWithoutId.length === 0) {
      setDuplicateMessage("No hay datos para enviar.");
      return;
    }

    const dataToSend = {
      data: dataToSendWithoutId,
    };

    try {
      const response = await ticketService.saveFilteredData(dataToSend);

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
    }
  };

  return (
    <div className="TicketSubmitComponent">
      <button onClick={handleSubmit} className="btn btn-primary">
        Enviar a la base de datos
      </button>

      {duplicateMessage && (
        <div className="error-message">
          <p>{duplicateMessage}</p>
          {duplicates.transportContract && (
            <p>
              <strong>Contrato de transporte Duplicados:</strong> {duplicates.transportContract.join(", ")}
            </p>
          )}
          {duplicates.orderNumber && (
            <p>
              <strong>Numero Orden Duplicados:</strong> {duplicates.orderNumber.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* <pre>{JSON.stringify(dataToSendWithoutId, null, 2)}</pre> */}
    </div>
  );
};

export default TicketSubmitComponent;
