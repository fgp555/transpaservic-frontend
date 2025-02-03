import React, { useState, useEffect } from "react";
import { orderService } from "../../../services/apiOrder";
import { operatorService } from "../../../services/apiOperator";

const OrderFilterPage = () => {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getAllTranport = async () => {
    const response = await operatorService.getAll();
    setOperatorData(response);
  };

  useEffect(() => {
    getAllTranport();
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
      "Cheque",
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

    // Generar archivo CSV
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

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
      <h1>Filtrar Orders {total}</h1>

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

        {/* Operador */}
        <select name="operator" value={filters.operator} onChange={handleFilterChange}>
          <option value="">Todos los operadors</option>
          {operatorData.map((operator) => (
            <option key={operator.id} value={operator.id}>
              {operator.name}
            </option>
          ))}
        </select>

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

        <button type="button" onClick={fetchOrders}>
          Filtrar
        </button>
        <button type="button" onClick={handleClearFilters}>
          Limpiar Filtros
        </button>
      </form>

      <button type="button" onClick={downloadCSV}>
        Descargar CSV
      </button>

      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>Cliente: {order.client}</p>
          </div>
        ))}
      </div>

      {renderPagination()}
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
};

export default OrderFilterPage;

