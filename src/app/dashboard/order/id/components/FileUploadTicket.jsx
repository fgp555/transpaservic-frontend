import React, { useEffect, useState } from "react";
import { orderService } from "../../../../../services/apiOrder";
import UploadImageButton from "../../../_components/UploadImageButton/UploadImageButton";
import Swal from "sweetalert2";
import { isLocalhost } from "../../../../../utils/apiBaseURL";

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

const FileUploadTicket = ({ orderNumberState, fetchOrder }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          <input type="number" id="approvalQuantity" name="approvalQuantity" value={formState.approvalQuantity} onChange={handleChange} />
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
      </form>
    </aside>
  );
};

export default FileUploadTicket;
