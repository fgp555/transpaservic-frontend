import { isLocalhost } from "../../../../../utils/apiBaseURL";
import { orderService } from "../../../../../services/apiOrder";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UploadImageButton from "../../../_components/UploadImageButton/UploadImageButton";

let tempData;
if (isLocalhost) {
  tempData = {
    ticketNumber: "123123",
    approvalTravelDate: "2025-03-05",
    approvalQuantity: "2",
    value: "3",
    netValue: "",
    approvalDate: "",
  };
} else {
  tempData = {
    ticketNumber: "",
    approvalTravelDate: "",
    approvalQuantity: "",
    value: "",
    netValue: "",
    approvalDate: "",
  };
}

const FileUploadTicket = ({ orderNumberState, fetchOrder, orderData }) => {
  const [compressedFile, setCompressedFile] = useState(null); // Para almacenar la imagen comprimida

  // const [formState, setFormState] = useState(tempData);
  const [formState, setFormState] = useState({
    ticketNumber: "",
    approvalTravelDate: "",
    approvalQuantity: "",
    value: "",
    netValue: "",
    approvalDate: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFormState((prevState) => ({
        ...prevState,
        approvalDate: new Date().toLocaleString("sv-SE", { timeZone: "America/Bogota" }).replace(" ", "T").slice(0, 19).replace(",", ""),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "approvalTravelDate") {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value, // Actualizamos la fecha
      }));
    } else if (name === "value" || name === "ticketNumber") {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value, // No aplicamos límites en `value` ni en `approvalQuantity`
      }));
    } else {
      const maxValue = orderData.quantity; // Límite máximo solo en `approvalQuantity`

      const newValue = Math.min(maxValue, Number(value)); // Aplicamos el límite solo a `approvalQuantity`

      setFormState((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      netValue: prev.value * prev.approvalQuantity, // Calculamos netValue
    }));
  }, [formState.value, formState.approvalQuantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString(); // Fecha y hora actual

    // Validar si no se ha seleccionado una imagen
    if (!compressedFile) {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona una imagen antes de enviar.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Detener el envío del formulario si no hay imagen
    }

    // Validar si el número de ticket está vacío
    if (!formState.ticketNumber) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa el número de ticket.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Detener el envío del formulario si el número de ticket está vacío
    }

    // Validar si la cantidad usada está vacía o no es válida
    if (!formState.approvalQuantity || formState.approvalQuantity <= 0) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa una cantidad usada válida.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Detener el envío del formulario si la cantidad usada es inválida
    }

    // Validar si el valor está vacío o no es válido
    if (!formState.value || formState.value <= 0) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un valor válido.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Detener el envío del formulario si el valor es inválido
    }

    // Confirmación antes de enviar el formulario
    const confirmSend = await Swal.fire({
      title: "¿Estás seguro de que deseas enviar y aprobar el ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    });

    if (confirmSend.isConfirmed) {
      const formData = new FormData();
      formData.append("ticketNumber", formState.ticketNumber);
      formData.append("file", compressedFile);
      formData.append("orderNumber", orderNumberState);
      formData.append("approvalTravelDate", formState.approvalTravelDate);
      formData.append("approvalQuantity", formState.approvalQuantity);
      formData.append("value", formState.value);
      formData.append("netValue", formState.netValue);
      formData.append("fulfillmentDate", currentDateTime); // Agregar fecha de cumplimiento
      formData.append("approvalDate", formState.approvalDate);

      try {
        const res = await orderService.approveOrder(formData);
        console.log(res);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: "Éxito",
          text: "El ticket se aprobó correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchOrder(); // Actualizar la orden después de un envío exitoso
      } catch (error) {
        console.log(error);

        // Mostrar mensaje de error
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al aprobar el ticket. Intenta nuevamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Cancelado",
        text: "El envío ha sido cancelado.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <aside>
      <h2>Cumplir ticket</h2>
      <br />
      <form className="dashboard" onSubmit={handleSubmit}>
        <aside>
          <div>
            <label htmlFor="approvalDate">Fecha de cumplimiento</label>
            <input type="datetime-local" id="approvalDate" name="approvalDate" value={formState.approvalDate} disabled />
          </div>

          <div>
            <label htmlFor="approvalTravelDate">Fecha real de viaje</label>
            <input type="date" id="approvalTravelDate" name="approvalTravelDate" value={formState.approvalTravelDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="ticketNumber">Numero de ticket</label>
            <input type="text" id="ticketNumber" name="ticketNumber" value={formState.ticketNumber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="approvalQuantity">Cantidad Usada</label>
            <input type="number" id="approvalQuantity" name="approvalQuantity" max={orderData.quantity} min="1" value={formState.approvalQuantity} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="value">Valor</label>
            <input type="number" id="value" name="value" value={formState.value} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="netValue">Valor total</label>
            <input type="number" id="netValue" name="netValue" value={formState.netValue} disabled />
          </div>
          <div className="mb-1">
            <UploadImageButton setCompressedFile={setCompressedFile} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Enviar y Cumplir
            </button>
          </div>
        </aside>
      </form>
    </aside>
  );
};

export default FileUploadTicket;
