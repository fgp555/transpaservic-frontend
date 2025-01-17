import React, { useState, useEffect } from "react";
import { ticketService } from "../../../services/apiTicket";
import { transportService } from "../../../services/apiTransport";
import TicketTableComponent from "./_components/TicketTableComponent";
import { useSelector } from "react-redux";

TicketTableComponent;
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

  const [tickets, setTickets] = useState([]);
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

    // Generar archivo CSV
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

    return (
      <div>
        <p>
          Página {filters.page} de {totalPages}
        </p>
        <button disabled={filters.page <= 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
          Anterior
        </button>
        {pages.map((page) => (
          <button key={page} onClick={() => setFilters((prev) => ({ ...prev, page }))} disabled={filters.page === page}>
            {page}
          </button>
        ))}
        <button disabled={filters.page >= totalPages} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>
        Gestión de Ordenes
        <span>{!isAdmin && <span> de {userSlice?.user?.transport?.name}</span>}</span>
      </h1>

      <h1>Elementos encontrados: {total}</h1>

      <form>
        {/* Búsqueda */}
        <input type="text" name="search" placeholder="Buscar por cliente o paciente" value={filters.search} onChange={handleFilterChange} />

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
          Limpiar Filtros
        </button>
      </form>

      <TicketTableComponent tickets={tickets} downloadCSV={downloadCSV} />

      {renderPagination()}

      {/* <pre>{JSON.stringify(tickets, null, 2)}</pre> */}
    </div>
  );
};

export default TicketListPage;
