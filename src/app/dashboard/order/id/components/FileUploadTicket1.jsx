import React, { useState } from "react";
import { orderService } from "../../../../../services/apiOrder";
import UploadImageButton from "../../../_components/UploadImageButton/UploadImageButton";
import Swal from "sweetalert2"; // Para mostrar alertas

const FileUploadTicket = ({ orderNumberState, fetchOrder }) => {
  const [ticketNumber, setTicketNumber] = useState("123123");
  const [compressedFile, setCompressedFile] = useState(null); // Para almacenar la imagen comprimida

  const handleTicketNumberChange = (e) => {
    setTicketNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmación antes de enviar el formulario
    const confirmSend = await Swal.fire({
      title: "¿Estás seguro de que deseas enviar y aprobar el ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    });

    if (confirmSend.isConfirmed) {
      // Si el usuario confirma, proceder con el envío
      const formData = new FormData();
      formData.append("ticketNumber", ticketNumber);
      formData.append("file", compressedFile);
      formData.append("orderNumber", orderNumberState);

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
      // Si el usuario cancela
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
      <h2>Subir Archivos</h2>
      <br />
      <form className="dashboard">
        <div>
          <label htmlFor="travelDate">Fecha real de viaje</label>
          <input type="date" id="travelDate" />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input type="number" id="quantity" />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input type="number" id="value" />
        </div>
        <div>
          <label htmlFor="valueTotal">Valor total</label>
          <input type="number" id="valueTotal" disabled />
        </div>
        <div>
          <label htmlFor="approvalDate">Fecha de cumplimiento</label>
          <input type="date" id="approvalDate" disabled />
        </div>
        <div>
          <label htmlFor="ticketNumber">Numero de ticket</label>
          <input type="text" id="ticketNumber" onChange={handleTicketNumberChange} value={ticketNumber} />
        </div>
      </form>
      <div className="mb-1">
        <UploadImageButton setCompressedFile={setCompressedFile} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Enviar y Aprobar
        </button>
      </div>
      <pre>{JSON.stringify(orderNumberState, null, 5)}</pre>
    </aside>
  );
};

export default FileUploadTicket;
