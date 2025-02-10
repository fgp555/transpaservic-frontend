import React, { useState } from "react";
import { apiBaseURL } from "../../../../../utils/apiBaseURL";
import { useSelector } from "react-redux";
import { orderService } from "../../../../../services/apiOrder";
import Swal from "sweetalert2"; // Para mostrar alertas

const FilePreview = ({ orderData, fetchOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [modalImage, setModalImage] = useState(""); // Estado para la imagen del modal
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const handleDeleteTicket = async (id) => {
    const confirmSend = await Swal.fire({
      title: "¿Estas seguro de eliminar el ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmSend.isConfirmed) {
      return;
    }

    try {
      const res = await orderService.deleteTicketImage(id);
      console.log(res);
      Swal.fire({
        title: "Éxito",
        text: "Ticket eliminado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchOrder();
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el ticket. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderPreview = () => {
    const fileUrl = orderData.ticketImage;
    if (!fileUrl) return <p>No hay archivo disponible.</p>;

    if (fileUrl.endsWith(".pdf")) {
      return (
        <iframe
          src={fileUrl}
          title="Vista previa del PDF"
          style={{ width: "100%", height: "500px", border: "none" }}
          //
        ></iframe>
      );
    } else if (
      fileUrl.endsWith(".jpg") ||
      fileUrl.endsWith(".jpeg") ||
      fileUrl.endsWith(".png")
      //
    ) {
      return (
        <>
          <img
            src={`${apiBaseURL}/uploads/${fileUrl}`}
            alt="Vista previa de la imagen"
            style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }}
            onClick={() => openModal(fileUrl)} // Abre el modal al hacer clic
          />
          {isAdmin && (
            <>
              <p>Solo el administrador puede eliminar el ticket</p>
              <button onClick={() => handleDeleteTicket(orderData.id)} className="btn btn-danger">
                Eliminar Ticket
              </button>
            </>
          )}
        </>
      );
    } else {
      return <p>Tipo de archivo no soportado.</p>;
    }
  };
  return (
    <aside className="file-preview">
      <h3>Vista previa</h3>
      {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
      <br />
      {renderPreview()}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={`${apiBaseURL}/uploads/${modalImage}`} alt="Vista previa en modal" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilePreview;
