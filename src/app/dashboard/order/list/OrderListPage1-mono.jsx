import React, { useState, useEffect } from "react";
import { orderService } from "../../../../services/apiOrder";
import { operatorService } from "../../../../services/apiOperator";
import { useSelector } from "react-redux";
import { OrderTableRespoComp } from "./_components/OrderTableRespoComp";
import "./OrderListPage.css";
// import { downloadCSV } from "./utils/downloadCSV";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para generar tablas automáticamente
// import { downloadPDF } from "./utils/downloadPDF";

const OrderListPage = () => {
  const initialFilters = {
    status: "",
    operator: "",
    page: 1,
    limit: 5, // Cantidad de elementos por página
    search: "",
    dateFrom: "",
    dateTo: "",
  };

  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [operatorData, setOperatorData] = useState([]);
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

  const getAllOperator = async () => {
    const response = await operatorService.getAll();
    setOperatorData(response);
  };

  useEffect(() => {
    getAllOperator();
  }, []);

  const handleClearFilters = () => {
    setFilters(initialFilters); // Restablece los filtros al estado inicial
  };

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrders(filters);
      if (data && Array.isArray(data.results)) {
        setOrders(data.results);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        setOrders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters, userSlice.user.role]);

  useEffect(() => {
    if (isAdmin) {
      // Para admin, no filtrar por operador
      setFilters((prevFilters) => ({
        ...prevFilters,
        operator: "", // Sin filtro específico
      }));
    } else {
      // Para usuarios no admin, filtrar por el operador del usuario
      setFilters((prevFilters) => ({
        ...prevFilters,
        operator: userSlice.user.operator?.id || "", // ID del operador asociado al usuario
      }));
    }
  }, [userSlice.user.role, userSlice.user.operator]);

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
      "Operador",
    ];

    // Filas de la tabla (incluyendo los datos para las columnas adicionales)
    const tableRows = orders.map((order) => [
      order.id,
      order.operatorContract || "",
      order.orderNumber || "",
      order.authorizationNumber || "",
      order.client || "",
      order.patientName || "",
      order.idCard || "", // Nueva columna: Identificación
      order.userPhone || "",
      order.email || "",
      new Date(order.creationDate).toLocaleDateString() || "", // Nueva columna: Fecha de Creación
      order.origin || "", // Nueva columna: Origen
      order.destination || "", // Nueva columna: Destino
      order.itinerary || "", // Nueva columna: Itinerario
      order.quantity || "", // Nueva columna: Cantidad
      order.travelDate || "",
      order.value || "", // Nueva columna: Valor
      order.status || "",
      order.operator.name || "", // Nueva columna: Operador
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
      "Autorización #",
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
      "Comentarios",
      "Estado",
      "Operador (Nombre)",
    ];
    csvRows.push(headers.join(","));

    // Datos
    orders.forEach((order) => {
      const row = [
        order.id,
        order.operatorContract || "",
        order.orderNumber || "",
        order.authorizationNumber || "",
        order.client || "",
        order.patientName || "",
        order.idCard || "",
        order.userPhone || "",
        order.email || "",
        order.creationDate || "",
        order.origin || "",
        order.destination || "",
        order.itinerary || "",
        order.quantity || "",
        order.travelDate || "",
        order.value || "",
        order.netValue || "",
        order.remarks || "",
        order.status || "",
        order.operator?.name || "",
      ];
      csvRows.push(row.join(","));
    });

    // Generar archivo CSV con BOM
    const csvContent = "\uFEFF" + csvRows.join("\n"); // Agrega el BOM al inicio del archivo
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="OrderListPage">
      <h1>
        Gestión de Ordenes
        <span>{!isAdmin && <span> de {userSlice?.user?.operator?.name}</span>}</span>
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
              {/* Operador */}
              <select name="operator" value={filters.operator} onChange={handleFilterChange}>
                <option value="">Todos los Operadores</option>
                {operatorData?.results?.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name}
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
        </section>
        <p>{total} Ordenes encontradas</p>
      </form>

      <OrderTableRespoComp data={orders} fetchOrders={fetchOrders} downloadCSV={downloadCSV} />

      {renderPagination()}
    </div>
  );
};

export default OrderListPage;
