import React, { useState } from "react";
import UploadImageButton from "../../../../../components/UploadImageButton/UploadImageButton";
import { orderService } from "../../../../../services/apiOrder";

const FileUploadTicket = ({ orderId, fetchOrder }) => {
  const [ticketNumber, setTicketNumber] = useState("123123");
  const [compressedFile, setCompressedFile] = useState(null); // Para almacenar la imagen comprimida
  const handleTicketNumberChange = (e) => {
    setTicketNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ticketNumber", ticketNumber);
    formData.append("file", compressedFile);
    formData.append("orderId", orderId);

    try {
      const res = await orderService.approveOrder(formData);
      // const res = await fetch("http://192.168.18.21:3000/api/order/approve", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!res.ok) throw new Error("Failed to upload file");

      // const data = await res.json();

      console.log(res);
      fetchOrder();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside>
      <h2>Subir Archivos</h2>
      <br />
      <form className="dashboard">
        <label htmlFor="ticketNumber">Numero de ticket</label>
        <input
          //
          type="text"
          id="ticketNumber"
          onChange={handleTicketNumberChange}
          value={ticketNumber}
        />
      </form>
      <div className="mb-1">
        <UploadImageButton setCompressedFile={setCompressedFile} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Enviar y Aprobar
        </button>
      </div>
    </aside>
  );
};

export default FileUploadTicket;
