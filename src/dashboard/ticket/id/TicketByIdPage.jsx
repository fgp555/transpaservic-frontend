import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ticketService } from "../../../services/apiTicket";
import Swal from "sweetalert2";
import BackButtonComponent from "../../_components/Buttons/BackButtonComponent";
import { BreadcrumbsComponent } from "../../_components/BreadcrumbsComponent/BreadcrumbsComponent";
import TicketTableByIdComp from "./components/TicketTableByIdComp";
import "./TicketByIdPage.css";

const TicketByIdPage = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await ticketService.getById(id);
        setTicketData(ticket);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el ticket", "error");
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticketData) {
    return (
      <div className="loading">
        <h2>Cargando...</h2>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Ordenes", link: "/dashboard/ticket/list" },
    { label: "Detalles de la Orden", link: `/dashboard/ticket/${id}` },
  ];

  const renderPreview = () => {
    const fileUrl = ticketData.image;
    if (!fileUrl) return <p>No hay archivo disponible.</p>;

    if (fileUrl.endsWith(".pdf")) {
      return <iframe src={fileUrl} title="Vista previa del PDF" style={{ width: "100%", height: "500px", border: "none" }}></iframe>;
    } else if (fileUrl.endsWith(".jpg") || fileUrl.endsWith(".jpeg") || fileUrl.endsWith(".png")) {
      return <img src={fileUrl} alt="Vista previa de la imagen" style={{ maxWidth: "100%", height: "auto" }} />;
    } else {
      return <p>Tipo de archivo no soportado.</p>;
    }
  };

  return (
    <div className="TicketByIdPage">
      <section className="breadcrumbs-container">
        <div>
          <BackButtonComponent />
          <BreadcrumbsComponent items={breadcrumbItems} className="breadcrumbs" />
        </div>
      </section>
      <br />
      <br />

      <h1>Detalles de la Orden</h1>
      <br />
      <section className="info-container">
        <aside>
          <TicketTableByIdComp ticketData={ticketData} />
        </aside>
        <aside className="file-preview">
          <h3>Vista previa</h3>
          <br />
          {renderPreview()}
        </aside>
      </section>
    </div>
  );
};

export default TicketByIdPage;
