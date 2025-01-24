import React, { useState, useEffect } from "react";
import { ticketService } from "../../../../services/apiTicket";
import { transportService } from "../../../../services/apiTransport";
import { useSelector } from "react-redux";
import { TicketTableRespoComp } from "./_components/TicketTableRespoComp";
import "./TicketListPage.css";
import { downloadCSV } from "./utils/downloadCSV";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para generar tablas automáticamente
// import { downloadPDF } from "./utils/downloadPDF";

const TicketListPage = () => {
  const initialFilters = {
    status: "",
    transport: "",
    page: 1,
    limit: 5, // Cantidad de elementos por página
    search: "",
    dateFrom: "",
    dateTo: "",
  };

  const [tickets, setTickets] = useState([
    {
      id: 7,
      transportContract: "12218554",
      orderNumber: "11026",
      mainDiagnosis: "ffff",
      client: "client701",
      patientName: "Gloria Sanchez",
      idCard: "32145698",
      userPhone: "3191234567",
      email: "client7@mail.com",
      creationDate: "2025-01-18T05:00:00.000Z",
      origin: "cucuta",
      destination: "bogota",
      itinerary: "cucuta-bogota",
      quantity: 1,
      travelDate: "2024-09-15",
      value: "100000.00",
      netValue: "100000.00",
      check: "check678",
      remarks: "medical transport",
      status: "aprobado",
      transport: {
        name: "Transricaurte",
      },
    },
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [transportData, setTransportData] = useState([]);
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: name === "search" ? 1 : prevFilters.page, // Restablece la página a 1 si el campo de búsqueda cambia
    }));
  };

  const getAllTransport = async () => {
    const response = await transportService.getAll();
    setTransportData(response);
  };

  useEffect(() => {
    getAllTransport();
  }, []);

  const handleClearFilters = () => {
    setFilters(initialFilters); // Restablece los filtros al estado inicial
  };

  const fetchTickets = async () => {
    try {
      const data = await ticketService.getTickets(filters);
      if (data && Array.isArray(data.results)) {
        setTickets(data.results);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        setTickets([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters, userSlice.user.role]);

  useEffect(() => {
    if (isAdmin) {
      // Para admin, no filtrar por transporte
      setFilters((prevFilters) => ({
        ...prevFilters,
        transport: "", // Sin filtro específico
      }));
    } else {
      // Para usuarios no admin, filtrar por el transporte del usuario
      setFilters((prevFilters) => ({
        ...prevFilters,
        transport: userSlice.user.transport?.id || "", // ID del transporte asociado al usuario
      }));
    }
  }, [userSlice.user.role, userSlice.user.transport]);

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null; // Si hay solo una página, no se muestra la paginación

    return (
      <div className="renderPagination">
        <button disabled={filters.page <= 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
          Anterior
        </button>
        {pages.map((page) => (
          <button key={page} className={filters.page === page ? "active" : ""} onClick={() => setFilters((prev) => ({ ...prev, page }))}>
            {page}
          </button>
        ))}
        <button disabled={filters.page >= totalPages} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
          Siguiente
        </button>
      </div>
    );
  };

  const downloadPDF = () => {
    // const doc = new jsPDF({ orientation: "landscape" }); // Cambia a orientación horizontal
    const doc = new jsPDF({
      orientation: "landscape", // Horizontal
      unit: "mm", // Unidad en milímetros
      format: "a2", // Tamaño de hoja A4
    });

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Órdenes", 14, 20);

    // Información adicional
    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Usuario: ${userSlice?.user?.name || "Desconocido"}`, 14, 35);

    // Columnas de la tabla (incluyendo las adicionales)
    const tableColumn = [
      "ID",
      "Contrato de Operador",
      "Número de Orden",
      "Diagnóstico",
      "Cliente",
      "Paciente",
      "Identificación",
      "Teléfono",
      "Correo",
      "Fecha de Creación",
      "Origen",
      "Destino",
      "Itinerario",
      "Cantidad",
      "F. Viaje",
      "Valor",
      "Estado",
      "Transporte",
    ];

    // Filas de la tabla (incluyendo los datos para las columnas adicionales)
    const tableRows = tickets.map((ticket) => [
      ticket.id,
      ticket.transportContract || "",
      ticket.orderNumber || "",
      ticket.mainDiagnosis || "",
      ticket.client || "",
      ticket.patientName || "",
      ticket.idCard || "", // Nueva columna: Identificación
      ticket.userPhone || "",
      ticket.email || "",
      new Date(ticket.creationDate).toLocaleDateString() || "", // Nueva columna: Fecha de Creación
      ticket.origin || "", // Nueva columna: Origen
      ticket.destination || "", // Nueva columna: Destino
      ticket.itinerary || "", // Nueva columna: Itinerario
      ticket.quantity || "", // Nueva columna: Cantidad
      ticket.travelDate || "",
      ticket.value || "", // Nueva columna: Valor
      ticket.status || "",
      ticket.transport.name || "", // Nueva columna: Transporte
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Guardar el PDF
    doc.save("reporte_ordenes.pdf");
  };

  const downloadCSV = () => {
    const csvRows = [];

    // Encabezados
    const headers = [
      "ID",
      "Contrato de Operador",
      "Número de Orden",
      "Diagnóstico Principal",
      "Cliente",
      "Nombre del Paciente",
      "Número de Identificación",
      "Teléfono",
      "Correo Electrónico",
      "Fecha de Creación",
      "Origen",
      "Destino",
      "Itinerario",
      "Cantidad",
      "Fecha de Viaje",
      "Valor",
      "Valor Neto",
      "Cheque",
      "Comentarios",
      "Estado",
      "Transporte (Nombre)",
    ];
    csvRows.push(headers.join(","));

    // Datos
    tickets.forEach((ticket) => {
      const row = [
        ticket.id,
        ticket.transportContract || "",
        ticket.orderNumber || "",
        ticket.mainDiagnosis || "",
        ticket.client || "",
        ticket.patientName || "",
        ticket.idCard || "",
        ticket.userPhone || "",
        ticket.email || "",
        ticket.creationDate || "",
        ticket.origin || "",
        ticket.destination || "",
        ticket.itinerary || "",
        ticket.quantity || "",
        ticket.travelDate || "",
        ticket.value || "",
        ticket.netValue || "",
        ticket.check || "",
        ticket.remarks || "",
        ticket.status || "",
        ticket.transport?.name || "",
      ];
      csvRows.push(row.join(","));
    });

    // Generar archivo CSV con BOM
    const csvContent = "\uFEFF" + csvRows.join("\n"); // Agrega el BOM al inicio del archivo
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="TicketListPage">
      <h1>
        Gestión de Ordenes
        <span>{!isAdmin && <span> de {userSlice?.user?.transport?.name}</span>}</span>
      </h1>
      <br />
      <form>
        {/* Búsqueda */}
        <input type="text" name="search" placeholder="Buscar por: orden, cliente, itinerario, paciente..." value={filters.search} onChange={handleFilterChange} />

        <section className="filters">
          {/* Estado */}
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos los estados</option>
            <option value="pendiente">vigente-pendiente</option>
            <option value="aprobado">aprobado</option>
            <option value="cancelado">cancelado</option>
          </select>

          {isAdmin && (
            <>
              {/* Transporte */}
              <select name="transport" value={filters.transport} onChange={handleFilterChange}>
                <option value="">Todos los Operadores</option>
                {transportData?.results?.map((transport) => (
                  <option key={transport.id} value={transport.id}>
                    {transport.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {/* Fecha Desde */}
          <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />

          {/* Fecha Hasta */}
          <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />

          {/* Cantidad de elementos por página */}
          <input
            type="number"
            name="limit"
            placeholder="Cantidad por página"
            value={filters.limit}
            min="1"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: Math.max(1, parseInt(e.target.value, 10) || 1), // Asegura que sea un número válido
              }))
            }
          />

          <button type="button" onClick={handleClearFilters}>
            Limpiar
          </button>
          <button type="button" onClick={downloadCSV}>
            CSV
          </button>
          <button type="button" onClick={downloadPDF}>
            PDF
          </button>
          {/* <button onClick={() => downloadPDF(tickets)}>Download PDF</button> */}
        </section>
        <p>{total} Ordenes encontradas</p>
      </form>

      {/* <pre>{JSON.stringify(tickets, null, 2)}</pre> */}

      <TicketTableRespoComp data={tickets} fetchTickets={fetchTickets} downloadCSV={downloadCSV} />

      {renderPagination()}
    </div>
  );
};

export default TicketListPage;
